import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogTitle-root': {
        backgroundColor: '#202c33',
        color: 'white',
    },
    '& .MuiDialogContent-root': {
        backgroundColor: '#202c33',
        color: 'white',
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        backgroundColor: '#202c33',
        padding: theme.spacing(1),
    },
    '& .MuiButton-root': {
        color: 'white',
        borderRadius: 12, // Setting border radius for the button
    },
    borderRadius: 12, // Setting border radius for the dialog
}));

export default function AbDialog({
    open,
    title,
    handleClose,
    buttonText,
    handleClick,
    children
}) {

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                    className: "custom-dialog-paper"
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {children}
                </DialogContent>
                {
                    buttonText &&
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={handleClick}
                            variant="contained"
                            sx={{
                                backgroundColor: '#111b21', // Change the button color
                            }}
                        >
                            {buttonText}
                        </Button>
                    </DialogActions>
                }
            </BootstrapDialog>
            <style jsx>
                {`
                  .custom-dialog-paper {
                    min-width: 500px;
                  }
                `}
            </style>

        </>
    );
}
