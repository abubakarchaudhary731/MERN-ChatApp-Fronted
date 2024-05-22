import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetNotificationData, resetSnackbar } from '../../reduxtoolkit/slices/SnakbarMessageSlice';
import AbSnackbar from '../inputfields/AbSnakbar';
import AbNotifications from '../inputfields/AbNotification';

const AppLayout = ({ children, header }) => {
    const { snackbarData, notificationData } = useSelector((state) => state.SnakMessages);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(resetSnackbar());
    };

    const handleNotificationClose = () => {
        dispatch(resetNotificationData());
    };
console.log(notificationData);
    return (
        <>
            {snackbarData && (
                <AbSnackbar
                    open={true}
                    handleClose={handleClose}
                    message={snackbarData.message}
                    variant={snackbarData.variant}
                />
            )}
            {notificationData && (
                <AbNotifications
                    open={true}
                    handleClose={handleNotificationClose}
                    userName={notificationData?.userName}
                    message={notificationData?.message}
                />
            )}

            <div className='h-screen'>
                {
                    header && (
                        <h1 className='fixed top-10 left-10 text-3xl text-primary font-bold'>Chat App</h1>
                    )
                }
                {children}
            </div>
        </>
    )
}

export default AppLayout