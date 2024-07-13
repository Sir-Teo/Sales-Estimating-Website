import React, { useEffect } from 'react';
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

const ClosestRows = ({ closest_rows, descriptions }) => {
  useEffect(() => {
    console.log('descriptions:', descriptions);
    console.log('closest_rows:', closest_rows);
  }, [descriptions, closest_rows]);

  return (
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
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    <TableCell key={cellIndex} align="right">
                      {descriptions[key] ? (
                        <Tooltip title={descriptions[key]} arrow>
                          <span style={{ display: 'inline-block' }}>{value}</span>
                        </Tooltip>
                      ) : (
                        value
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ClosestRows;
