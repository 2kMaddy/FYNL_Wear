import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.post("/create-order", createOrder);
orderRoutes.post("/verify-payment", verifyPayment);

export default orderRoutes;
