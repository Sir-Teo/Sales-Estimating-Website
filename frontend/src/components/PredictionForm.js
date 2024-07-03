// src/components/PredictionForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, IconButton, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const itemOptions = [
  'Master_Controllers',
  'Field_Controllers',
  'VAV_Controllers',
  'Sensors',
  'Panels',
  'Software',
  'Computers'
];

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
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Enter Prediction Data</Typography>
      {formData.map((item, index) => (
        <Box key={index} mb={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                label={item.name.replace('_', ' ')}
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveItem(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Grid container spacing={3} style={{ marginTop: '10px' }}>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <InputLabel id="select-item-label">Select Item</InputLabel>
            <Select
              labelId="select-item-label"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              fullWidth
            >
              {itemOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.replace('_', ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleAddItem} startIcon={<AddIcon />}>
            Add Item
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
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
