import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const Product = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: uuid,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discountPer: {
    type: String,
  },
  discountPrice: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
  size: {
    type: [String],
    enum: ["S", "M", "L", "XL", "XXL"],
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", Product);
