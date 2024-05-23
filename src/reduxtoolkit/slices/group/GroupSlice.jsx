import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Store from "../../Store";

let initialState = {
    loading: false,
    errors: null,
    message: null,
};

// ******************** Create a Group ******************** //
export const createGroup = createAsyncThunk("createGroup", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.post("http://localhost:5000/api/chat/group", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

// ******************** Update Group Name ******************** //
export const updateGroupName = createAsyncThunk("updateGroupName", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.put("http://localhost:5000/api/chat/rename", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

// ******************** Add User To Group ******************** //
export const addUserToGroup = createAsyncThunk("addUserToGroup", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.put("http://localhost:5000/api/chat/groupadd", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

// ******************** Remove User To Group ******************** //
export const removeUserFromGroup = createAsyncThunk("removeUserFromGroup", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.put("http://localhost:5000/api/chat/groupremove", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

const GroupSlice = createSlice({
    name: "GroupSlice",
    initialState,
    reducers: {
        emptySearchUser: (state) => {
            state.searchUsers = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })

            // ******************** Update Group Name ******************** //
            .addCase(updateGroupName.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(updateGroupName.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateGroupName.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })

            // ******************** Add User To Group ******************** //
            .addCase(addUserToGroup.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(addUserToGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(addUserToGroup.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })

            // ******************** Remove User To Group ******************** //
            .addCase(removeUserFromGroup.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(removeUserFromGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(removeUserFromGroup.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })
    },
});

export default GroupSlice.reducer;