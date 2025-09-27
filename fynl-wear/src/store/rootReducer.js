import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";

// combine all reducers into root reducers
const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
});

export default rootReducer;
