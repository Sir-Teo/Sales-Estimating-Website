//src/components/PredictionForm.js

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, Box, Chip } from '@mui/material';
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
                codes.map(code => ({ group, code })))
              }
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.code}
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
          <Chip
          key={index}
          label={`${item.name}: ${item.quantity || 'Not set'}`}
          onDelete={() => handleRemoveItem(index)}
          deleteIcon={<DeleteIcon data-testid={`delete-icon-${index}`} />}
          color={item.quantity ? "primary" : "default"}
          sx={{ m: 0.5 }}
          />
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
