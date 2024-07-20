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
  if (!predictions || !predictions.results || predictions.results.length === 0) {
    return (
      <Paper className="p-6 mt-6 mb-6">
        <Typography variant="h6">No saved predictions yet.</Typography>
      </Paper>
    );
  }

  return (
    <Paper className="p-6 mt-6 mb-6">
      <Typography variant="h4" className="mb-4">
        Saved Predictions
      </Typography>
      <List>
        {predictions.results.map((prediction, index) => (
          <ListItem key={prediction.id || index} divider={index < predictions.results.length - 1}>
            <ListItemText
              primary={'Prediction: ' + prediction.project_name}
              secondary={
                <Box component="span" className="flex flex-col">
                  <Typography variant="body2" color="text.secondary">
                    Date: {prediction.created_at ? new Date(prediction.created_at).toLocaleString() : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {prediction.email}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="view" 
                onClick={() => onPredictionClick(prediction)}
                className="mr-2"
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
