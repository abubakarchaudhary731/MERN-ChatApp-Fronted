import React from 'react';
import { Snackbar, Slide, Alert } from '@mui/material';

const SlideTransition = (props) => {
    return <Slide {...props} direction="left" />;
};

const AbSnackbar = ({
    open,
    handleClose,
    message,
    variant,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={variant}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AbSnackbar;