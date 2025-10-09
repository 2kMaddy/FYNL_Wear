import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const options = {
      amount: Math.floor(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error,
    });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    items,
    shippingAddress,
    paymentMethod,
  } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  // validate product stock and availability
  if (generated_signature === razorpay_signature) {
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const { color, productId, quantity, size } = item;

      // check product existance
      const product = await Product.findOne({ productId });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${product.name} not found`,
        });
      }

      // check product stock availability
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${product.name}`,
        });
      }

      // calculate subtotal
      const itemTotal = product.price * quantity;
      totalPrice += itemTotal;

      orderItems.push({
        productId,
        name: product.name,
        quantity,
        price: product.price,
        size,
        color,
        image1: product.image1,
      });

      // update product stock
      product.stock -= quantity;
      await product.save();
    }

    // Save order in DB
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount: totalPrice,
      shippingAddress: {
        phone: shippingAddress.phone,
        doorNo: shippingAddress.doorNo,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
      },
      payment: {
        provider: "Razorpay",
        transactionId: razorpay_payment_id,
        paymentReference: razorpay_order_id,
        paymentStatus: "paid",
        paymentDate: new Date(),
      },
    });
    const saveOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order created and payment verified successfully",
      data: saveOrder,
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "Payment verification failed",
    });
  }
};
