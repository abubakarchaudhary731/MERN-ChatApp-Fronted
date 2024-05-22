import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    snackbarData: null,
    notificationData: null
};

const SnakMessageSlice = createSlice({
    name: "SnakMessage",
    initialState,
    reducers: {
        addSnackbarData: (state, action) => {
            state.snackbarData = action.payload;
        },
        resetSnackbar: (state) => {
            state.snackbarData = null;
        },
        addNotificationData: (state, action) => {
            state.notificationData = action.payload;
        },
        resetNotificationData: (state) => {
            state.notificationData = null;
        },
    },

});

export const { addSnackbarData, resetSnackbar, addNotificationData, resetNotificationData } = SnakMessageSlice.actions;
export default SnakMessageSlice.reducer;