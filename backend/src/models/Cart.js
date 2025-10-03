import mongoose, { Schema } from "mongoose";

const CartItem = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: [CartItem],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Cart.set("timestamps", true);

export default mongoose.model("Cart", Cart);
