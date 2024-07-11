import React from 'react';
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ClosestRows = ({ closest_rows }) => (
  <Card elevation={4} sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Closest Rows
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Row</TableCell>
              {Object.keys(closest_rows[0] || {}).map(key => (
                <TableCell key={key} align="right">{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {closest_rows.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex} align="right">{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export default ClosestRows;