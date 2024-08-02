import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Container, Snackbar, Alert } from '@mui/material';
import Header from './components/Header';
import AboutPage from './components/AboutPage';
import HelpPage from './components/HelpPage';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ErrorSnackbar from './components/ErrorSnackbar';
import MarkdownReport from './components/MarkdownReport';
import { useAuth } from './hooks/useAuth';
import { usePredictions } from './hooks/usePredictions';

const theme = createTheme({
  // You can customize your theme here
});

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

  const [currentPage, setCurrentPage] = useState('main');
  const [registrationMessage, setRegistrationMessage] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleRegister = async (userData) => {
    try {
      const result = await register(userData);
      if (result.success) {
        setRegistrationMessage(result.message);
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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogout={logout}
          showSavedPredictions={showSavedPredictions}
          setShowSavedPredictions={setShowSavedPredictions}
          onNavigate={handleNavigate}
        />
        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
          {currentPage === 'main' && (
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
            />
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'help' && <HelpPage />}
          {currentPage === 'report' && <MarkdownReport />}
        </Container>
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
