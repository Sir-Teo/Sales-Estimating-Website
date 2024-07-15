import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import PredictionChart from './PredictionChart';
import DetailedResultsTable from './DetailedResultsTable';
import InputInformation from './InputInformation';
import ClosestRows from './ClosestRows';
import { prepareChartData } from './utils';

const descriptions = {'AN01': 'Repair',
  'AN02': 'Advance replacement',
  'AN03': 'Infilink controller',
  'AN04': '12 controller',
  'AN05': 'B3 controller',
  'AN06': 'Expansion modules',
  'AN07': 'Roamio/roamio-2',
  'AN08': 'Blink repeater',
  'AN09': 'Agx controller',
  'BA01': 'Building analytics',
  'BD01': 'Bonding',
  'CO01': 'Net controller',
  'CO02': 'Power supply',
  'CO03': 'I/o modules',
  'CO04': 'Enclosures',
  'CO05': 'Displays',
  'CO06': 'Bcx master',
  'CO07': 'Software',
  'CO08': 'Xdriver',
  'CO09': 'Software upgrade',
  'CP01': 'Workstation',
  'CP02': 'Software',
  'CP03': 'Printer',
  'CP04': 'Battery back-up/ups',
  'CP05': 'Server',
  'CP06': 'Software upgrade',
  'CP07': 'Network switch',
  'DA01': 'Electric',
  'DA02': 'Pneumatic',
  'DA03': 'Endswitch',
  'DM01': 'Dampers',
  'DT01': 'Firestat',
  'DT02': 'Leak (water)',
  'DT03': 'Duct smoke',
  'DT04': 'Space smoke',
  'DT05': 'Tank level',
  'DT06': 'Co2 - carbon dioxide',
  'DT07': 'Alarm module',
  'DT08': 'Carbon monoxide',
  'DT09': 'Methane sensor',
  'EN01': 'Enclosures',
  'FB01': 'Panel fab materials',
  'HO01': 'No Description',
  'HO02': 'Design',
  'HO03': 'Fabrication',
  'HO04': 'Programming - control',
  'HO05': 'Project mgmt',
  'HO06': 'Training',
  'HO07': 'Programming - frontend',
  'HO08': 'Pneumatic',
  'HO09': 'Controls technician',
  'HO10': 'Electrical technician',
  'HO11': 'Other labor',
  'HO12': 'Start up',
  'HS01': 'Space',
  'HS02': 'Duct',
  'HS03': 'Immersion',
  'HS04': 'Outdoor',
  'IM01': 'Electric',
  'IM02': 'Pneumatic',
  'MD01': 'Motors',
  'MD02': 'Drives',
  'MG01': 'Meters/gauges',
  'SB01': 'Electricians',
  'SB02': 'Pneumatic',
  'SB03': 'Steamfitters',
  'SB04': 'Miscellaneous',
  'SE01': 'Camera',
  'SE02': 'Monitor',
  'SE03': 'Dvr',
  'SE04': 'Maglock',
  'SE05': 'Door strike',
  'SE06': 'Software',
  'SE07': 'Software upgrade',
  'SE08': 'Card readers',
  'SE09': 'Id cards',
  'SE10': 'Miscellaneous',
  'SE11': 'Aiphone equipment',
  'SE12': 'Door contacts, pirs',
  'SS01': 'Relay',
  'SS02': 'High limit',
  'ST01': 'Freezestat',
  'ST02': 'Aquastat',
  'ST03': 'Thermostat',
  'ST04': 'Firestat',
  'DC01': 'Apex',
  'DC02': 'S1000 -master controller',
  'DC03': 'I/o module',
  'DC04': 'Controller',
  'DC05': 'Ecy - vav controller',
  'DC06': 'Space sensors',
  'DC07': 'Thermostat',
  'DC08': 'Software',
  'DC09': 'Jace - distech',
  'SW01': 'Duct static',
  'SW02': 'Current',
  'SW03': 'Water pressure',
  'SW04': 'Fan status (air dp)',
  'SW05': 'Filter status - air flow',
  'SW06': 'Water flow',
  'SX01': 'As',
  'SX02': 'Server software (es, rs)',
  'SX03': 'Power supply',
  'SX04': 'I/o module',
  'SX05': 'Mpc controller',
  'SX06': 'Mpv vav controller',
  'TC01': 'Duct static',
  'TC02': 'Water pressure',
  'TC03': 'Steam pressure',
  'TC04': 'Current',
  'TC05': 'Air flow - (afmd)',
  'TD01': 'Jace controllers',
  'TD02': 'Enterprise software',
  'TD03': 'Tridium miscellaneous',
  'TL01': 'Telecom/service provider',
  'TO01': 'Tools',
  'TR01': 'Current to pneumatic (i/p)',
  'TR02': 'Elec. to pneumatic (i/p)',
  'TR03': 'Pneumatic to elec. (p/e)',
  'TS01': 'Space',
  'TS02': 'Duct',
  'TS03': 'Immersion - water',
  'TS04': 'Outdoor',
  'TS05': 'Carbon dioxide',
  'TX01': 'Sales tax',
  'VL01': 'Electrical',
  'VL02': 'Pneumatic',
  'WI01': 'Wire',
  'WR01': 'Warranty',
  'OM01': 'Other materials',
  'OM02': 'Repair',
  'OM03': 'Advance replacement',
  'UA01': 'Unallocated costs'};

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
