import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";

// combine all reducers into root reducers
const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
