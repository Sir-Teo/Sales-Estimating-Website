import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';

const ResultDisplay = ({ results }) => {
  if (!results) return null;

  return (
    <Paper sx={{ padding: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Prediction Results
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(results).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography>
              {key}: {value.toFixed(2)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ResultDisplay;
