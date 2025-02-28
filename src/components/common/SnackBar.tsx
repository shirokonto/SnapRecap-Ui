import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackBarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

const SnackBar = ({ open, message, severity, onClose }: SnackBarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%', textAlign: 'center' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
