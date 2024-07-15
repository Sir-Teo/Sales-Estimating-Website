import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, Box, Chip, Tooltip } from '@mui/material';
import { Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const groupsManual = {
  'AN ANDOVER EQUIPMENT': ['AN01',
    'AN02',
    'AN03',
    'AN04',
    'AN05',
    'AN06',
    'AN07',
    'AN08',
    'AN09'],
  'BA1 BUILDING ANALYTICS': ['BA01'],
  'BD1 BONDING': ['BD01'],
  'CO CONTINUUM': ['CO01',
    'CO02',
    'CO03',
    'CO04',
    'CO05',
    'CO06',
    'CO07',
    'CO08',
    'CO09'],
  'CP COMPUTER': ['CP01', 'CP02', 'CP03', 'CP04', 'CP05', 'CP06', 'CP07'],
  'DA DAMPER ACTUATORS': ['DA01', 'DA02', 'DA03'],
  'DC DISTECH CONTROLS': ['DC01',
    'DC02',
    'DC03',
    'DC04',
    'DC05',
    'DC06',
    'DC07',
    'DC08',
    'DC09'],
  'DM1 DAMPERS': ['DM01'],
  'DT DETECTOR': ['DT01',
    'DT02',
    'DT03',
    'DT04',
    'DT05',
    'DT06',
    'DT07',
    'DT08',
    'DT09'],
  'EN1 ENCLOSURES': ['EN01'],
  'FB1 PANEL FAB MATERIALS': ['FB01'],
  'HS HUMIDITY SENSORS (RH)': ['HS01', 'HS02', 'HS03', 'HS04'],
  'IM INSTALLATION MATERIAL': ['IM01', 'IM02'],
  'MD MOTORS AND DRIVES': ['MD01', 'MD02'],
  'MG1 METERS/GAUGES': ['MG01'],
  'OM OTHER MATERIALS': ['OM01', 'OM02', 'OM03'],
  'SB SUB-CONTRACTORS': ['SB01', 'SB02', 'SB03', 'SB04'],
  'SE SECURITY': ['SE01',
    'SE10',
    'SE11',
    'SE12',
    'SE02',
    'SE03',
    'SE04',
    'SE05',
    'SE06',
    'SE07',
    'SE08',
    'SE09'],
  'SS SWITCHES/SIGNAL': ['SS01', 'SS02'],
  'ST STATS': ['ST01', 'ST02', 'ST03', 'ST04'],
  'SW SWITCHES/CONTROLLER': ['SW01', 'SW02', 'SW03', 'SW04', 'SW05', 'SW06'],
  'SX STRUXUREWARE': ['SX01', 'SX02', 'SX03', 'SX04', 'SX05', 'SX06'],
  'TC TRANSDUCERS/CONTROLLER': ['TC01', 'TC02', 'TC03', 'TC04', 'TC05'],
  'TD TRIDIUM/JACE': ['TD01', 'TD02', 'TD03'],
  'TL1 TELECOM/SERVICE PROVIDER': ['TL01'],
  'TO1 TOOLS': ['TO01'],
  'TR TRANSDUCER/SIGNAL': ['TR01', 'TR02', 'TR03'],
  'TS TEMPERATURE SENSORS': ['TS01', 'TS02', 'TS03', 'TS04', 'TS05'],
  'TX1 SALES TAX': ['TX01'],
  'UA1 UNALLOCATED COSTS': ['UA01'],
  'VL VALVES': ['VL01', 'VL02'],
  'WI1 WIRE': ['WI01'],
  'WR1 WARRANTY': ['WR01']
};

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


const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (index, e) => {
    const newItems = formData.map((item, i) => (
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    ));
    setFormData(newItems);
  };

  const handleAddItem = () => {
    if (selectedItem) {
      setFormData([...formData, { name: selectedItem.code, quantity: '' }]);
      setSelectedItem(null);
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.filter((_, i) => i !== index);
    setFormData(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = formData.reduce((acc, item) => {
      acc[item.name] = item.quantity;
      return acc;
    }, {});
    onSubmit(data);
    setFormData([]); // Clear the form data
  };

  return (
    <Paper sx={{ padding: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Enter Prediction Data</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <FormControl fullWidth>
            <Autocomplete
              options={Object.entries(groupsManual).flatMap(([group, codes]) =>
                codes.map(code => ({ group, code, description: descriptions[code] }))
              )}
              groupBy={(option) => option.group}
              getOptionLabel={(option) => `${option.code} - ${option.description}`}
              value={selectedItem}
              onChange={(event, newValue) => setSelectedItem(newValue)}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              renderInput={(params) => <TextField {...params} label="Select Item" />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            startIcon={<AddIcon />}
            disabled={!selectedItem}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        {formData.map((item, index) => (
          <Tooltip key={index} title={descriptions[item.name]} arrow>
            <Chip
              label={`${item.name}: ${item.quantity || 'Not set'}`}
              onDelete={() => handleRemoveItem(index)}
              deleteIcon={<DeleteIcon data-testid={`delete-icon-${index}`} />}
              color={item.quantity ? "primary" : "default"}
              sx={{ m: 0.5 }}
            />
          </Tooltip>
        ))}
      </Box>

      {formData.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {formData.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={`Quantity for ${item.name}`}
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={formData.length === 0 || formData.some(item => !item.quantity)}
        sx={{ mt: 3 }}
        fullWidth
      >
        Make Prediction
      </Button>
    </Paper>
  );
};

export default PredictionForm;
