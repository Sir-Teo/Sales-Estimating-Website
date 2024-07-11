import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, ListSubheader } from '@mui/material';

const InputInformation = ({ inputs }) => (
  <Card elevation={4} sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Input Information
      </Typography>
      <List subheader={<ListSubheader>Items and Quantities</ListSubheader>}>
        {Object.entries(inputs).map(([name, quantity]) => (
          <ListItem key={name}>
            <ListItemText primary={name} secondary={`Quantity: ${quantity}`} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default InputInformation;