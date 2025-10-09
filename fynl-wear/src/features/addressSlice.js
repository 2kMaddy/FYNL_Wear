import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../services/addressServices";

export const fetchShippingAddress = createAsyncThunk(
  "user/getShippingAddress",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await getAddress(userId);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(
        error.response?.data?.message || "Get shipping address failed"
      );
    }
  }
);

const initialState = {
  shippingAddress: {},
  error: null,
  loading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.loading = true;
      state.error = null;
      state.shippingAddress = {};
    };
    const commonReject = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.shippingAddress = {};
    };
    builder
      .addCase(fetchShippingAddress.pending, commonPending)
      .addCase(fetchShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.shippingAddress = action.payload.data;
      })
      .addCase(fetchShippingAddress.rejected, commonReject);
  },
});

export default addressSlice.reducer;
