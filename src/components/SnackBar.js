import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function SnackBar({open,massage}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"

      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert severity="success">{massage}</Alert>
      </Snackbar>
    </div>
  );
}
