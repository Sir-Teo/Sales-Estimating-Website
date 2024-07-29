import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, Snackbar, Alert } from '@mui/material';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ErrorSnackbar from './components/ErrorSnackbar';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import { usePredictions } from './hooks/usePredictions';

function App() {
  const { isLoggedIn, user, login, register, logout } = useAuth();
  const { 
    results, 
    inputs, 
    error, 
    isLoading, 
    savedPredictions, 
    showSavedPredictions, 
    setShowSavedPredictions,
    handleSubmit,
    handleSavedPredictionClick,
    handleDeletePrediction
  } = usePredictions(isLoggedIn);

  const [registrationMessage, setRegistrationMessage] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const [forceLoginMode, setForceLoginMode] = useState(false);

  const handleRegister = async (userData) => {
    try {
      const result = await register(userData);
      if (result.success) {
        setRegistrationMessage(result.message);
        setForceLoginMode(true);
      }
    } catch (err) {
      setRegistrationError(err.message);
    }
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setRegistrationMessage(null);
    setRegistrationError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogout={logout}
          showSavedPredictions={showSavedPredictions}
          setShowSavedPredictions={setShowSavedPredictions}
        />
        <MainContent 
          isLoggedIn={isLoggedIn}
          onLogin={login}
          onRegister={handleRegister}
          showSavedPredictions={showSavedPredictions}
          savedPredictions={savedPredictions}
          onSavedPredictionClick={handleSavedPredictionClick}
          onDeletePrediction={handleDeletePrediction}
          onSubmit={(data) => handleSubmit({ ...data, userEmail: user })}
          isLoading={isLoading}
          results={results}
          inputs={inputs}
          userEmail={user}
          forceLoginMode={forceLoginMode}
        />
        <Footer />
      </Box>
      <ErrorSnackbar error={error} />
      <Snackbar open={!!registrationMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
        <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
          {registrationMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!registrationError} autoHideDuration={6000} onClose={handleCloseMessage}>
        <Alert onClose={handleCloseMessage} severity="error" sx={{ width: '100%' }}>
          {registrationError}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;