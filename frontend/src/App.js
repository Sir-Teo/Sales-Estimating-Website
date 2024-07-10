// src/App.js

import React, { useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Menu, MenuItem, CssBaseline, ThemeProvider, createTheme, CircularProgress, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import { makePrediction } from './api';
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      setResults(null);
      setInputs(formData);
      const data = await makePrediction(formData);
      setResults(data);
    } catch (err) {
      setError('An error occurred while making the prediction. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>About</MenuItem>
              <MenuItem onClick={handleMenuClose}>Help</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sales Prediction Tool
          </Typography>
          <PredictionForm onSubmit={handleSubmit} />
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress role="progressbar" />
            </Box>
          )}
          {results && <ResultDisplay results={results} inputs={inputs} />}
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
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </ThemeProvider>
  );
}

export default App;
