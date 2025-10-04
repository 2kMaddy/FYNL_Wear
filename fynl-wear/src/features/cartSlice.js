import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addToCart } from "../services/cartServices";

// add to cart service
export const fetchAddToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size }, { rejectWithValue }) => {
    try {
      const response = await addToCart(userId, productId, quantity, size);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

// get cart items
export const fetchGetCart = createAsyncThunk(
  "cart/getCartItems",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await getCart(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Get cart items failed"
      );
    }
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // default pending and rejected state values
    const commonPending = (state) => {
      state.loading = true;
      state.error = null;
      state.cartItems = [];
    };
    const commonReject = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.cartItems = [];
    };
    builder
      // add to cart
      .addCase(fetchAddToCart.pending, commonPending)
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAddToCart.rejected, commonReject)

      //   get cart items
      .addCase(fetchGetCart.pending, commonPending)
      .addCase(fetchGetCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchGetCart.rejected, commonReject);
  },
});

export default cartSlice.reducer;
