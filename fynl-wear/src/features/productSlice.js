import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "../services/productServices";

// API call for fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/getProducts",
  async ({ category, sortBy, page, limit }, { rejectWithValue }) => {
    try {
      const response = await getProducts(category, sortBy, page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch products failed"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/getProductById",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await getProductById(productId);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch product failed"
      );
    }
  }
);

// initial state of product reducer state
const initialState = {
  products: [],
  loading: false,
  error: null,
  totalPage: null,
  currentPage: 1,
  product: null,
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
      state.totalPage = null;
      state.currentPage = null;
      state.product = null;
    };
    // default rejected state values
    const commonReject = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
      state.totalPage = null;
      state.currentPage = null;
      state.product = null;
    };
    builder
      // get all products api call state managing
      .addCase(fetchAllProducts.pending, commonPending)
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.error = null;
        state.totalPage = action.payload.totalPage;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAllProducts.rejected, commonReject)

      // get product by id
      .addCase(fetchProductById.pending, commonPending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, commonReject);
  },
});

export default productSlice.reducer;
