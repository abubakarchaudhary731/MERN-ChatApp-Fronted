import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Store from "../../Store";

let initialState = {
    ChatUsers: [],
    searchUsers: [],
    loading: false,
    errors: null,
    message: null,
};

// ******************** Search User ******************** //
export const searchUser = createAsyncThunk("searchUser", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.get(`http://localhost:5000/api/user?search=${data}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        return error;
    }
});

// ******************** Start Chat To New User ******************** //
export const startChat = createAsyncThunk("startChat", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.post("http://localhost:5000/api/chat", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

// ******************** Fetch Chats ******************** //
export const fetchChats = createAsyncThunk("fetchChats", async () => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.get("http://localhost:5000/api/chat", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        return error;
    }
});

const FetchChatSlice = createSlice({
    name: "FetchChatSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.loading = false;
                state.ChatUsers = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })

            // ******************** Search User ******************** //
            .addCase(searchUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.searchUsers = action.payload;
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })

            // ******************** Start Chat To New User ******************** //
            .addCase(startChat.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(startChat.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(startChat.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })
    },
});

export default FetchChatSlice.reducer;