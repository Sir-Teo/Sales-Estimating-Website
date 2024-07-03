// components/PredictionForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, IconButton, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
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

const allCodes = Object.values(groupsManual).flat();

const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (index, e) => {
    const newItems = formData.map((item, i) => (
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    ));
    setFormData(newItems);
  };

  const handleAddItem = () => {
    if (selectedItem) {
      setFormData([...formData, { name: selectedItem, quantity: '' }]);
      setSelectedItem('');
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
  };

  return (
    <Paper sx={{ padding: 3, mt: 3 }}>
      <Typography variant="h6">Enter Prediction Data</Typography>
      {formData.map((item, index) => (
        <Box key={index} mb={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label={item.name}
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton onClick={() => handleRemoveItem(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth>
            <InputLabel id="select-item-label">Select Item</InputLabel>
            <Select
              labelId="select-item-label"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              fullWidth
            >
              {allCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={handleAddItem} startIcon={<AddIcon />}>
            Add Item
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Make Prediction
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PredictionForm;
