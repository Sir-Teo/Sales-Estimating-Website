//src/components/ResultDisplay.js

import React from 'react';
import { Typography, Paper, Grid, Box, Divider, LinearProgress, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { green, red, blue } from '@mui/material/colors';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';


const ResultDisplay = ({ results }) => {
  if (!results) return null;

  const chartData = Object.entries(results).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <Paper sx={{ padding: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Prediction Results
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Results Overview
          </Typography>
          {chartData.map(({ name, value }) => (
            <Box key={name} sx={{ my: 2 }}>
              <Typography variant="body2" gutterBottom>
                {name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(value / maxValue) * 100}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Detailed Results
          </Typography>
          <Grid container spacing={2}>
            {chartData.map(({ name, value }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <Card elevation={2}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: value > maxValue * 0.8 ? green[500] : value > maxValue * 0.5 ? blue[500] : red[500] }}>
                        {value > maxValue * 0.8 ? <EmojiEventsIcon /> : value > maxValue * 0.5 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      </Avatar>
                    }
                    title={name}
                    titleTypographyProps={{ variant: 'body2' }}
                  />
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultDisplay;
