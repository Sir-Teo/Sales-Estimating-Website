import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, ListSubheader, Grid } from '@mui/material';

const InputInformation = ({ inputs }) => {
  const projectDetails = ['project_name', 'userEmail'];

  const renderInputItems = (items) => {
    return Object.entries(items).map(([key, value]) => (
      <ListItem key={key} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <ListItemText 
          primary={key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          secondary={`Quantity: ${value}`}
        />
      </ListItem>
    ));
  };

  const formatLabel = (label) => {
    if (label === 'userEmail') {
      return 'User Email';
    }
    return label.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card elevation={4} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ borderBottom: '1px solid #e0e0e0 ', pb: 1 }}>
          Input Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List
              subheader={<ListSubheader sx={{ bgcolor: 'transparent', fontSize: '1.2em', fontWeight: 'bold' }}>Project Details</ListSubheader>}
            >
              {projectDetails.map((detail) => (
                <ListItem key={detail} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemText 
                    primary={formatLabel(detail)}
                    secondary={inputs[detail]}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List
              subheader={<ListSubheader sx={{ bgcolor: 'transparent', fontSize: '1.2em', fontWeight: 'bold' }}>Items and Quantities</ListSubheader>}
            >
              {inputs.inputs && typeof inputs.inputs === 'object' 
                ? renderInputItems(inputs.inputs)
                : <ListItem><ListItemText primary="No items found" /></ListItem>
              }
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InputInformation;