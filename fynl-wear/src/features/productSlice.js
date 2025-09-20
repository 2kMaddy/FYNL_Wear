import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit";
import { getProducts } from "../services/productServices";

// API call for fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/getProducts",
  async ({ category, sortBy }, { rejectWithValue }) => {
    try {
      const response = await getProducts(category, sortBy);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch products failed"
      );
    }
  }
);

// initial state of product reducer state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// product slice to perform actions for state updation
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // state update while API calls
  extraReducers: (builder) => {
    // default pending state values
    const commonPending = (state) => {
      state.loading = true;
      state.error = null;
      state.products = [];
    };
    // default rejected state values
    const commonReject = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
    };
    builder
      // get all products api call state managing
      .addCase(fetchAllProducts.pending, commonPending)
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, commonReject);
  },
});

export default productSlice.reducer;
