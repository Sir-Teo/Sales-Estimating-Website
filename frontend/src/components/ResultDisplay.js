import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import PredictionChart from './PredictionChart';
import DetailedResultsTable from './DetailedResultsTable';
import InputInformation from './InputInformation';
import ClosestRows from './ClosestRows';
import { prepareChartData } from './utils';
import { descriptions } from './utils';

const ResultDisplay = ({ results = {}, inputs = {} }) => {
  if (!results) return null;

  const { rf_predictions, xgb_predictions, closest_rows } = results;
  const chartData = prepareChartData(rf_predictions, xgb_predictions, descriptions);

  return (
    <Paper sx={{ padding: 3, mt: 3, mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        Prediction Results
      </Typography>

      <Grid container spacing={4}>

        <Grid item xs={12}>
          <InputInformation inputs={inputs} descriptions={descriptions} />
        </Grid>

        <Grid item xs={12}>
          <PredictionChart chartData={chartData} />
        </Grid>

        <Grid item xs={12}>
          <DetailedResultsTable chartData={chartData} descriptions={descriptions} />
        </Grid>

        <Grid item xs={12}>
          <ClosestRows closest_rows={closest_rows} descriptions={descriptions} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultDisplay;
