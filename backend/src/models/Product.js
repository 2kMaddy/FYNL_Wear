import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const Product = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: uuid(),
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
    type: Number,
    required: true,
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
    required: true,
    enum: ["S", "M", "L", "XL", "XXL"],
  },
  color: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", Product);
