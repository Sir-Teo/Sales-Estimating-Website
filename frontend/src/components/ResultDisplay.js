// src/components/ResultDisplay.js

import React, { useState } from 'react';
import { Typography, Paper, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const ResultDisplay = ({ results = {}, inputs = {} }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!results) return null;

  const chartData = Object.entries(results).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 3, mt: 3, mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        Prediction Results For Model 1
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prediction Results Chart
              </Typography>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickCount={5} />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detailed Results Table
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Quantity (Hours)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chartData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.name} hover>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={chartData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Input Information
      </Typography>
      <Card elevation={4} sx={{ mt: 2 }}>
        <CardContent>
          <List subheader={<ListSubheader>Items and Quantities</ListSubheader>}>
            {Object.entries(inputs).map(([name, quantity]) => (
              <ListItem key={name}>
                <ListItemText primary={name} secondary={`Quantity: ${quantity}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default ResultDisplay;