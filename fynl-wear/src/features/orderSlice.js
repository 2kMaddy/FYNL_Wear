import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { createOrder } from "../services/orderServices";

export const fetchCreateOrder = createAsyncThunk(
  "order/createOrder",
  async ({ totalAmount }, { rejectWithValue }) => {
    try {
      const response = await createOrder({ totalAmount });
      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(
        error.response?.data?.message || "Create order failed"
      );
    }
  }
);

const initialState = {
  orderList: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.orderList = [];
      state.loading = true;
      state.error = null;
    };
    const commonReject = (state, action) => {
      state.orderList = [];
      state.loading = false;
      state.error = action.payload;
    };
    builder
      .addCase(fetchCreateOrder.pending, commonPending)
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCreateOrder.rejected, commonReject);
  },
});

export default orderSlice.reducer;
