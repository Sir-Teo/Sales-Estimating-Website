import { Paper, Typography, Box } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box mb={0.5}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {data.description}
        </Typography>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            RF: {data.RF}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            XGB: {data.XGB}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return null;
};

export default CustomTooltip;
