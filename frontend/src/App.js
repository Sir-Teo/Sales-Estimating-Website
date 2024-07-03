import React, { useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import { makePrediction } from './api';
import logo from './assets/logo.png'; // Adjust the path according to your directory structure

function App() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      const data = await makePrediction(formData);
      setResults(data);
    } catch (err) {
      setError('An error occurred while making the prediction. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Box component="img" src={logo} alt="Company Logo" sx={{ height: 64, marginRight: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ML Prediction Web App
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>About</MenuItem>
            <MenuItem onClick={handleMenuClose}>Help</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <PredictionForm onSubmit={handleSubmit} />
        {error && (
          <Typography color="error" style={{ marginTop: '20px' }}>
            {error}
          </Typography>
        )}
        <ResultDisplay results={results} />
      </Box>
    </Container>
  );
}

export default App;
