import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  user: "",
  token: null,
  loading: false,
  errorLogin: null,
  message: null,
};

export const loginUser = createAsyncThunk("user", async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/login", data);

    return response.data;

  } catch (error) {
    return error;
  }
});

const LoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload.message;
      });
  },
});

export const { logoutUser } = LoginSlice.actions;
export default LoginSlice.reducer;
