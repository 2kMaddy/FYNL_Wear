import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import orderReducer from "../features/orderSlice";
import addressSlice from "../features/addressSlice";

// combine all reducers into root reducers
const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  address: addressSlice,
});

export default rootReducer;
