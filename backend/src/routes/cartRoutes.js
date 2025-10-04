import { Router } from "express";
import { verifyToken } from "../utils/tokenGenerator.js";
import { addCartItem, getCartItem } from "../controllers/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/add-to-cart", verifyToken, addCartItem);
cartRoutes.get("/get-cart/:userId", verifyToken, getCartItem);

export default cartRoutes;
