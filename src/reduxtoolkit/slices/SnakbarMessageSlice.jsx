import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    snackbarData: null,
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
    },

});

export const { addSnackbarData, resetSnackbar } = SnakMessageSlice.actions;
export default SnakMessageSlice.reducer;