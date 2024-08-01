import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LabelList, Legend
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const CostPredictionChart = ({ chartData }) => (
  <Card elevation={4}>
    <CardContent>
      <Typography variant="h6" gutterBottom align="center">
        Cost Prediction Results Chart
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
              label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', fontSize: 14 }}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="RF" fill="#8884d8" name="Random Forest Cost">
              <LabelList dataKey="RF" position="top" angle={-45} fontSize={10} />
            </Bar>
            <Bar dataKey="XGB" fill="#82ca9d" name="XGBoost Cost">
              <LabelList dataKey="XGB" position="top" angle={-45} fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default CostPredictionChart;