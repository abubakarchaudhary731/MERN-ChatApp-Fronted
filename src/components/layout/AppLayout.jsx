import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackbar } from '../../reduxtoolkit/slices/SnakbarMessageSlice';
import AbSnackbar from '../inputfields/AbSnakbar';

const AppLayout = ({ children, header }) => {
    const { snackbarData } = useSelector((state) => state.SnakMessages);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(resetSnackbar());
    };
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