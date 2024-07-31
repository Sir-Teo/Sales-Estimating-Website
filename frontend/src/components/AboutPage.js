
// components/AboutPage.js
import React from 'react';
import { Container, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

function AboutPage() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4, backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          About Sales Estimating Website
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          The Sales Estimating Website is a platform designed to estimate the actual hours of work needed to complete a project based on user inputs. The project leverages a frontend built with React and a backend powered by Django with a PostgreSQL database.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            Key Features:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="User-friendly interface for inputting project details" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Real-time estimation of work hours" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Integration of machine learning models for accurate predictions" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Beautiful and responsive design" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Dockerized setup for easy deployment" />
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            Machine Learning Models:
          </Typography>
          <Typography variant="body1" paragraph align="justify">
            Our sales estimation tool utilizes two powerful machine learning models: Random Forest and XGBoost.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Random Forest
          </Typography>
          <Typography variant="body2" paragraph align="justify">
            Random Forest is an ensemble learning method that constructs multiple decision trees and merges their outputs to improve accuracy and reduce overfitting. It is robust and handles large datasets well, making it ideal for overall estimation tasks.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Pros:</strong> High accuracy, handles large datasets, robust to overfitting.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Cons:</strong> Can be slow to train, less interpretable than single decision trees.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            XGBoost
          </Typography>
          <Typography variant="body2" paragraph align="justify">
            XGBoost (Extreme Gradient Boosting) is a powerful gradient boosting framework that builds models in a stage-wise fashion. It is known for its speed and performance, particularly in competitions and large-scale datasets. It excels at finding patterns in past company jobs.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Pros:</strong> High performance, fast training, handles missing data well.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Cons:</strong> Can be prone to overfitting if not properly tuned, more complex to implement.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage;