import React from 'react';
import { Snackbar, Slide } from '@mui/material';
import { styled } from '@mui/system';

const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
};

const NotificationContent = styled('div')(({ theme }) => ({
    backgroundColor: '#111b21',
    padding: 10,
    borderRadius: 10,
    maxWidth: 450,
    minWidth: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
}));

const AbNotifications = ({
    open,
    handleClose,
    message,
    userName,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <NotificationContent>
                <strong>{userName}</strong>
                <br />
                {message}
            </NotificationContent>
        </Snackbar>
    );
};

export default AbNotifications;