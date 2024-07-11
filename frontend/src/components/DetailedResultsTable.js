import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const DetailedResultsTable = ({ chartData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const [dataWithMean, setDataWithMean] = useState([]);

  useEffect(() => {
    // Calculate the mean for each row and set the new state
    const updatedData = chartData.map(row => ({
      ...row,
      mean: ((row.RF + row.XGB) / 2).toFixed(2) // calculate mean and format to 2 decimal places
    }));
    setDataWithMean(updatedData);
  }, [chartData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detailed Results Table
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">RF Prediction (Hours)</TableCell>
                <TableCell align="right">XGB Prediction (Hours)</TableCell>
                <TableCell align="right"><b>Mean of RF and XGB (Hours</b>)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataWithMean
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.RF}</TableCell>
                    <TableCell align="right">{row.XGB}</TableCell>
                    <TableCell align="right"><b>{row.mean}</b></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[11, 25, 50]}
          component="div"
          count={dataWithMean.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default DetailedResultsTable;
