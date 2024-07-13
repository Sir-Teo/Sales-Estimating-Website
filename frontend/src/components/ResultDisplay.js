import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import PredictionChart from './PredictionChart';
import DetailedResultsTable from './DetailedResultsTable';
import InputInformation from './InputInformation';
import ClosestRows from './ClosestRows';
import { prepareChartData } from './utils';

const descriptions = {
  'CO01': 'Description for CO01',
  'CO06': 'Description for CO06',
  'AN09': 'Description for AN09',
  'SX01': 'Description for SX01',
  'TD01': 'Description for TD01',
  'DC01': 'Description for DC01',
  'DC02': 'Description for DC02',
  'DC09': 'Description for DC09',
  'SX05': 'Description for SX05',
  'SX06': 'Description for SX06',
  'AN04': 'Description for AN04',
  'AN05': 'Description for AN05',
  'AN06': 'Description for AN06',
  'DC03': 'Description for DC03',
  'DC04': 'Description for DC04',
  'DC05': 'Description for DC05',
  'SX04': 'Description for SX04',
  'DA01': 'Description for DA01',
  'DA02': 'Description for DA02',
  'DA03': 'Description for DA03',
  'DM01': 'Description for DM01',
  'DT01': 'Description for DT01',
  'DT02': 'Description for DT02',
  'DT03': 'Description for DT03',
  'DT04': 'Description for DT04',
  'DT05': 'Description for DT05',
  'DT06': 'Description for DT06',
  'DT07': 'Description for DT07',
  'DT08': 'Description for DT08',
  'DT09': 'Description for DT09',
  'HS01': 'Description for HS01',
  'HS02': 'Description for HS02',
  'HS03': 'Description for HS03',
  'HS04': 'Description for HS04',
  'MD01': 'Description for MD01',
  'MD02': 'Description for MD02',
  'SE01': 'Description for SE01',
  'SE02': 'Description for SE02',
  'SE03': 'Description for SE03',
  'SE04': 'Description for SE04',
  'SE05': 'Description for SE05',
  'SE06': 'Description for SE06',
  'SE07': 'Description for SE07',
  'SE08': 'Description for SE08',
  'SE09': 'Description for SE09',
  'SE10': 'Description for SE10',
  'SE11': 'Description for SE11',
  'SE12': 'Description for SE12',
  'SS01': 'Description for SS01',
  'SS02': 'Description for SS02',
  'ST01': 'Description for ST01',
  'ST02': 'Description for ST02',
  'ST03': 'Description for ST03',
  'ST04': 'Description for ST04',
  'DC06': 'Description for DC06',
  'DC07': 'Description for DC07',
  'SW01': 'Description for SW01',
  'SW02': 'Description for SW02',
  'SW03': 'Description for SW03',
  'SW04': 'Description for SW04',
  'SW05': 'Description for SW05',
  'SW06': 'Description for SW06',
  'TC01': 'Description for TC01',
  'TC02': 'Description for TC02',
  'TC03': 'Description for TC03',
  'TC04': 'Description for TC04',
  'TC05': 'Description for TC05',
  'TR01': 'Description for TR01',
  'TR02': 'Description for TR02',
  'TR03': 'Description for TR03',
  'TS01': 'Description for TS01',
  'TS02': 'Description for TS02',
  'TS03': 'Description for TS03',
  'TS04': 'Description for TS04',
  'TS05': 'Description for TS05',
  'VL01': 'Description for VL01',
  'VL02': 'Description for VL02',
  'EN01': 'Description for EN01',
  'CO07': 'Description for CO07',
  'CP02': 'Description for CP02',
  'DC08': 'Description for DC08',
  'CP06': 'Description for CP06',
  'SX02': 'Description for SX02',
  'TD02': 'Description for TD02',
  'CP01': 'Description for CP01',
  'CP05': 'Description for CP05',
  'HO01': 'Description for HO01',
  'HO02': 'Description for HO02',
  'HO03': 'Description for HO03',
  'HO04': 'Description for HO04',
  'HO05': 'Description for HO05',
  'HO06': 'Description for HO06',
  'HO07': 'Description for HO07',
  'HO08': 'Description for HO08',
  'HO09': 'Description for HO09',
  'HO10': 'Description for HO10',
  'HO11': 'Description for HO11',
  'HO12': 'Description for HO12',
};

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
