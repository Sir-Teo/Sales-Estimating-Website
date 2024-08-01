import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const DetailedCostResultsTable = ({ chartData, descriptions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const [dataWithMean, setDataWithMean] = useState([]);

  useEffect(() => {
    const updatedData = chartData.map(row => ({
      ...row,
      mean: ((row.RF + row.XGB) / 2).toFixed(2),
      description: descriptions[row.name]
    }));
    setDataWithMean(updatedData);
  }, [chartData, descriptions]);

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
          Detailed Cost Results Table
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">RF Cost Prediction ($)</TableCell>
                <TableCell align="right">XGB Cost Prediction ($)</TableCell>
                <TableCell align="right"><b>Mean of RF and XGB ($)</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataWithMean
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell component="th" scope="row">
                      {row.name} - {row.description}
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

export default DetailedCostResultsTable;