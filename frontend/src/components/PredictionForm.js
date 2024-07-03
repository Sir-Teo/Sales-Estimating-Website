// src/components/PredictionForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';

const initialFormData = {
  Master_Controllers: '',
  Field_Controllers: '',
  VAV_Controllers: '',
  Sensors: '',
  Panels: '',
  Software: '',
  Computers: '',
};

const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Enter Prediction Data</Typography>
        </Grid>
        {Object.keys(initialFormData).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              fullWidth
              label={key.replace('_', ' ')}
              name={key}
              type="number"
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Make Prediction
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PredictionForm;