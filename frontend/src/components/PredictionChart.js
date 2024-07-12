import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LabelList, Legend
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const PredictionChart = ({ chartData }) => (
  <Card elevation={4}>
    <CardContent>
      <Typography variant="h6" gutterBottom align="center">
        Prediction Results Chart
      </Typography>
      <div style={{ width: '100%', height: 600 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', fontSize: 14 }}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="RF" fill="#1976d2" name="Random Forest">
              <LabelList dataKey="RF" position="top" angle={-45} fontSize={10} />
            </Bar>
            <Bar dataKey="XGB" fill="#388e3c" name="XGBoost">
              <LabelList dataKey="XGB" position="top" angle={-45} fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default PredictionChart;
