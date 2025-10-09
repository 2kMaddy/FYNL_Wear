import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      image1: {
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed", "cancelled", "refunded"],
    default: "pending",
  },
  payment: {
    provider: { type: String, default: "Razorpay" },
    transactionId: { type: String },
    paymentReference: { type: String },
    paymentStatus: { type: String },
    paymentDate: { type: Date },
  },
  shippingAddress: {
    phone: {
      type: String,
      required: true,
    },
    doorNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
