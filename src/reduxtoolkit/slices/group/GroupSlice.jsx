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

// ******************** Fetch Chats ******************** //
// export const fetchChats = createAsyncThunk("fetchChats", async () => {
//     const token = Store.getState().LoginUser.token;
//     try {
//         const response = await axios.get("http://localhost:5000/api/chat", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data;

//     } catch (error) {
//         return error;
//     }
// });

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
    },
});

export default GroupSlice.reducer;