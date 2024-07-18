import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, Box, Chip, Tooltip } from '@mui/material';
import { Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { groupsManual, descriptions } from './utils';

const PredictionForm = ({ onSubmit, userEmail }) => {
  const [formData, setFormData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [projectName, setProjectName] = useState('');

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
    const data = {
      projectName,
      inputs: formData.reduce((acc, item) => {
        acc[item.name] = item.quantity;
        return acc;
      }, {}),
      userEmail
    };
    onSubmit(data);
    setFormData([]); // Clear the form data
    setProjectName(''); // Clear the project name
  };

  return (
    <Paper sx={{ padding: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Enter Prediction Data</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </Grid>
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
        disabled={formData.length === 0 || formData.some(item => !item.quantity) || !projectName}
        sx={{ mt: 3 }}
        fullWidth
      >
        Make Prediction
      </Button>
    </Paper>
  );
};

export default PredictionForm;
