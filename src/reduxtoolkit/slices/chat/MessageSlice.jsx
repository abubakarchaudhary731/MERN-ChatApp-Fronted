import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Store from "../../Store";

let initialState = {
    chatMessages: [],
    loading: false,
    errors: null,
    message: null,
};

// ******************** Send Message ******************** //
export const sendMessage = createAsyncThunk("sendMessage", async (data) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.post("http://localhost:5000/api/message", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

// ******************** Fetch Message related to Chat ******************** //
export const fetchMessages = createAsyncThunk("fetchMessages", async (chatId) => {
    const token = Store.getState().LoginUser.token;
    try {
        const response = await axios.get(`http://localhost:5000/api/message/${chatId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        return error;
    }
});

const MessageSlice = createSlice({
    name: "MessageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ******************** Send Message ******************** //
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })

            // ******************** Fetch Message related to Chat ******************** //
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.chatMessages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.error;
            })
    },
});

export default MessageSlice.reducer;