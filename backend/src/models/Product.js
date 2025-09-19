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
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  image1: {
    type: String,
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
  },
  color: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", Product);
