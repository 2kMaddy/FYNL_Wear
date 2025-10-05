import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../services/cartServices";

// add to cart service
export const fetchAddToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size, color }, { rejectWithValue }) => {
    try {
      const response = await addToCart(
        userId,
        productId,
        quantity,
        size,
        color
      );
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

// delete cart item
export const fetchDeleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem(userId, cartItemId);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Delete cart item failed"
      );
    }
  }
);

// Update cart item quantity
export const fetchUpdateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(userId, cartItemId, quantity);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response?.data?.message || "Update cart item failed"
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
  reducers: {
    deleteCartItemState: (state, action) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // default pending and rejected state values
    const commonPending = (state) => {
      state.loading = true;
      state.error = null;
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
      .addCase(fetchGetCart.rejected, commonReject)
      // delete cart item
      .addCase(fetchDeleteCartItem.pending, commonPending)
      .addCase(fetchDeleteCartItem.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDeleteCartItem.rejected, commonReject)
      // Update cart item
      .addCase(fetchUpdateCartItem.pending, commonPending)
      .addCase(fetchUpdateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { cartItemId, quantity } = action.meta.arg;
        const itemIndex = state.cartItems.findIndex(
          (item) => item._id === cartItemId
        );
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity = quantity;
        }
        console.log(state.cartItems);
      })
      .addCase(fetchUpdateCartItem.rejected, commonReject);
  },
});

export default cartSlice.reducer;
export const { deleteCartItemState } = cartSlice.actions;
