import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin } from "../services/adminServices";

export const fetchAdminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginAdmin(email, password);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Admin login failed"
      );
    }
  }
);

const initialState = {
  admin: {},
  loading: false,
  error: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.loading = true;
      state.admin = {};
      state.error = null;
      state.isAuthenticated = false;
    };
    const commonReject = (state, action) => {
      state.loading = false;
      state.admin = {};
      state.error = action.payload;
      state.isAuthenticated = false;
    };
    builder
      // Admin login
      .addCase(fetchAdminLogin.pending, commonPending)
      .addCase(fetchAdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchAdminLogin.rejected, commonReject);
  },
});

export default adminSlice.reducer;
