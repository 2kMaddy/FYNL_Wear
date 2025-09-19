import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";

// combine all reducers into root reducers
const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
