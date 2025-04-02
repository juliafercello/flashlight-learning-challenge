import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface IProps {
  open: boolean
  message: string
  type: AlertColor
  handleClose: () => void
}

export const ShowSnackbarMessage = (props: IProps) => {
  const { open, message, type, handleClose } = props

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}