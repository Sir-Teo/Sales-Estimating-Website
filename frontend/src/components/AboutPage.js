// components/AboutPage.js
import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

function AboutPage() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About TMBA Sales Estimation Prediction
        </Typography>
        <Typography variant="body1" paragraph>
          TMBA Sales Estimation Prediction is a cutting-edge tool designed to help businesses forecast their sales with precision and ease. Our advanced algorithms analyze historical data and market trends to provide accurate predictions.
        </Typography>
        <Typography variant="body1" paragraph>
          Founded in 2022, our mission is to empower businesses of all sizes with the insights they need to make informed decisions and drive growth.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>Advanced machine learning algorithms</li>
            <li>User-friendly interface</li>
            <li>Customizable prediction models</li>
            <li>Secure data handling</li>
          </ul>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage;