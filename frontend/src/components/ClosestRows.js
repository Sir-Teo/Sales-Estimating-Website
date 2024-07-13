import React, { useEffect } from 'react';
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

const ClosestRows = ({ closest_rows, descriptions }) => {
  useEffect(() => {
    console.log('descriptions:', descriptions);
    console.log('closest_rows:', closest_rows);
  }, [descriptions, closest_rows]);

  const getTooltipContent = (key, value, row) => {
    const description = descriptions[key] || 'No description available';
    const jobDescription = row['JobDescription'] || 'No job description available';
    return (
      <>
        <div><strong>Description:</strong> {description}</div>
        <div><strong>Job Description:</strong> {jobDescription}</div>
      </>
    );
  };

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
                  <TableCell key={key} align="right">
                    <Tooltip title={descriptions[key] || ''} arrow>
                      <span style={{ display: 'inline-block' }}>{key}</span>
                    </Tooltip>
                  </TableCell>
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
                      <Tooltip title={getTooltipContent(key, value, row)} arrow>
                        <span style={{ display: 'inline-block' }}>{value}</span>
                      </Tooltip>
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