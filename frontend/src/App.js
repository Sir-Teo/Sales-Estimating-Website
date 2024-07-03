// src/App.js
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import { makePrediction } from './api';

function App() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

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
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ML Prediction Web App
        </Typography>
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
