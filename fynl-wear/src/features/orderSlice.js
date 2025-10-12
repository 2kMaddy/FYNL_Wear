import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { createOrder, getOrdersById } from "../services/orderServices";

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

export const fetchGetOrderById = createAsyncThunk(
  "order/getOrderById",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await getOrdersById(userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Get orders failed"
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
      // Create order
      .addCase(fetchCreateOrder.pending, commonPending)
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCreateOrder.rejected, commonReject)

      // Get order by id
      .addCase(fetchGetOrderById.pending, commonPending)
      .addCase(fetchGetOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderList = action.payload.data;
      });
  },
});

export default orderSlice.reducer;
