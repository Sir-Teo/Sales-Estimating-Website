import React from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Paper, 
  Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SavedPredictions = ({ predictions, onPredictionClick, onDeletePrediction }) => {
  if (!predictions || predictions.length === 0) {
    return (
      <Paper sx={{ padding: 3, mt: 3, mb: 3 }}>
        <Typography variant="h6">No saved predictions yet.</Typography>
      </Paper>
    );
  }


  return (
    <Paper sx={{ padding: 3, mt: 3, mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        Saved Predictions
      </Typography>
      <List>
        {predictions.map((prediction, index) => (
          <ListItem key={prediction.id || index} divider={index < predictions.length - 1}>
            <ListItemText
              primary={`Prediction ${index + 1}`}
              secondary={
                <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" color="text.secondary">
                    Date: {prediction.created_at ? new Date(prediction.created_at).toLocaleString() : 'N/A'}
                  </Typography>
                  
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="view" 
                onClick={() => onPredictionClick(prediction)}
                sx={{ mr: 1 }}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => onDeletePrediction(prediction.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SavedPredictions;