import React from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import LoginForm from './LoginForm';
import PredictionForm from './PredictionForm';
import ResultDisplay from './ResultDisplay';
import SavedPredictions from './SavedPredictions';

function MainContent({
  isLoggedIn,
  onLogin,
  onRegister,
  showSavedPredictions,
  savedPredictions,
  onSavedPredictionClick,
  onDeletePrediction,
  onSubmit,
  isLoading,
  results,
  inputs
}) {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sales Prediction Tool
      </Typography>
      {!isLoggedIn ? (
        <LoginForm onLogin={onLogin} onRegister={onRegister} />
      ) : (
        <>
          {showSavedPredictions ? (
            <SavedPredictions 
              predictions={savedPredictions}
              onPredictionClick={onSavedPredictionClick}
              onDeletePrediction={onDeletePrediction}
            />
          ) : (
            <>
              <PredictionForm onSubmit={onSubmit} />
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
  );
}

export default MainContent;