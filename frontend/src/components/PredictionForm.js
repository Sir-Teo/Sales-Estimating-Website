import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, Box, Chip, Tooltip } from '@mui/material';
import { Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const groupsManual = {
  'Master_Controllers': ['CO01', 'CO06', 'AN09', 'SX01', 'TD01', 'DC01', 'DC02', 'DC09'],
  'Field_Controllers': ['SX05', 'SX06'],
  'VAV_Controllers': ['AN04', 'AN05', 'AN06', 'DC03', 'DC04', 'DC05', 'SX04'],
  'Sensors': ['DA01', 'DA02', 'DA03', 'DM01', 'DT01', 'DT02', 'DT03', 'DT04', 'DT05', 'DT06', 'DT07', 'DT08', 'DT09', 'HS01', 'HS02', 'HS03', 'HS04', 'MD01', 'MD02', 'SE01', 'SE02', 'SE03', 'SE04', 'SE05', 'SE06', 'SE07', 'SE08', 'SE09', 'SE10', 'SE11', 'SE12', 'SS01', 'SS02', 'ST01', 'ST02', 'ST03', 'ST04', 'DC06', 'DC07', 'SW01', 'SW02', 'SW03', 'SW04', 'SW05', 'SW06', 'TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TR01', 'TR02', 'TR03', 'TS01', 'TS02', 'TS03', 'TS04', 'TS05', 'VL01', 'VL02'],
  'Panels': ['EN01'],
  'Software': ['CO07', 'CP02', 'DC08', 'CP06', 'SX02', 'TD02'],
  'Computers': ['CP01', 'CP05'],
};

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
};

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
