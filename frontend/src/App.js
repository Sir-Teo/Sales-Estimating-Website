import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Menu, MenuItem, CssBaseline, ThemeProvider, createTheme, CircularProgress, Snackbar, Button, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import LoginForm from './components/LoginForm';
import { makePrediction, login, register, getSavedPredictions } from './api';
import logo from './assets/TMBA Logo 2020 white transparent.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [results, setResults] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [savedPredictions, setSavedPredictions] = useState([]);
  const [showSavedPredictions, setShowSavedPredictions] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        fetchSavedPredictions();
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const fetchSavedPredictions = async () => {
    try {
      const predictions = await getSavedPredictions();
      setSavedPredictions(predictions);
    } catch (err) {
      console.error('Error fetching saved predictions', err);
      if (err.response && err.response.status === 401) {
        setTokenExpired(true);
        handleLogout();
      } else {
        setError('Failed to fetch saved predictions');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      setResults(null);
      setInputs(formData);
      const data = await makePrediction(formData);
      setResults(data);
      fetchSavedPredictions(); // Refresh saved predictions after a new prediction
    } catch (err) {
      setError('An error occurred while making the prediction. Please try again.');
      console.error(err);
      if (err.response && err.response.status === 401) {
        setTokenExpired(true);
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const loginResponse = await login(credentials);
      setUser(loginResponse.user);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));
      fetchSavedPredictions();
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      const registrationResponse = await register(userData);
      setUser(registrationResponse.user);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(registrationResponse.user));
      fetchSavedPredictions();
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setResults(null);
    setInputs(null);
    setSavedPredictions([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleSavedPredictionClick = (prediction) => {
    setInputs(prediction.input_data);
    setResults({
      rf_predictions: prediction.rf_predictions,
      xgb_predictions: prediction.xgb_predictions,
    });
    setShowSavedPredictions(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Box component="img" src={logo} alt="Company Logo" sx={{ height: 48, marginRight: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TMBA Sales Estimation Prediction
            </Typography>
            {isLoggedIn && user && (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Welcome, {user.username}
                </Typography>
                <Button color="inherit" onClick={() => setShowSavedPredictions(!showSavedPredictions)}>
                  {showSavedPredictions ? 'Hide Saved' : 'Show Saved'}
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => setAnchorEl(null)}>About</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Help</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sales Prediction Tool
          </Typography>
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
          ) : (
            <>
              {showSavedPredictions ? (
                <Box>
                  <Typography variant="h5" gutterBottom>Saved Predictions</Typography>
                  <List>
                    {savedPredictions.map((prediction, index) => (
                      <ListItem key={index} button onClick={() => handleSavedPredictionClick(prediction)}>
                        <ListItemText 
                          primary={`Prediction ${index + 1}`} 
                          secondary={new Date(prediction.created_at).toLocaleString()} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <>
                  <PredictionForm onSubmit={handleSubmit} />
                  {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <CircularProgress role="progressbar" />
                    </Box>
                  )}
                  {results && <ResultDisplay results={results} inputs={inputs} />}
                </>
              )}
            </>
          )}
        </Container>
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} TMBA All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
      <Snackbar
        open={Boolean(error) || tokenExpired}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setTokenExpired(false);
        }}
        message={tokenExpired ? 'Your session has expired. Please log in again.' : error}
      />
    </ThemeProvider>
  );
}

export default App;