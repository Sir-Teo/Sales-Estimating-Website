import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
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
          onRegister={register}
          showSavedPredictions={showSavedPredictions}
          savedPredictions={savedPredictions}
          onSavedPredictionClick={handleSavedPredictionClick}
          onDeletePrediction={handleDeletePrediction}
          onSubmit={(data) => handleSubmit({ ...data, userEmail: user.email })}
          isLoading={isLoading}
          results={results}
          inputs={inputs}
        />
        <Footer />
      </Box>
      <ErrorSnackbar error={error} />
    </ThemeProvider>
  );
}

export default App;
