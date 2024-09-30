import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk("register", async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
);

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default RegisterSlice.reducer;
