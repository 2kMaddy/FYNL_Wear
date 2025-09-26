import { Router } from "express";
import { getCartItem, addCartItem } from "../controllers/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/add-cart-item", addCartItem);
cartRoutes.get("/get-cart-items", getCartItem);

export default cartRoutes;
