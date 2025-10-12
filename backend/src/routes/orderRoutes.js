import { Router } from "express";
import {
  createOrder,
  getOrdersById,
  verifyPayment,
} from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.post("/create-order", createOrder);
orderRoutes.post("/verify-payment", verifyPayment);
orderRoutes.get("/get-order-by-id/:userId", getOrdersById);

export default orderRoutes;
