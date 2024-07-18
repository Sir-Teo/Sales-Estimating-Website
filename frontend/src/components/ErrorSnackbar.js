import React from 'react';
import { Snackbar } from '@mui/material';

function ErrorSnackbar({ error }) {
  return (
    <Snackbar
      open={Boolean(error)}
      autoHideDuration={6000}
      onClose={() => {}}
      message={error}
    />
  );
}

export default ErrorSnackbar;