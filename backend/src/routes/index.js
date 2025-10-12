import { Router } from "express";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import userRoutes from "./userRoutes.js";
import addressRoutes from "./addressRoute.js";
import orderRoutes from "./orderRoutes.js";
import adminRoutes from "./adminRoute.js";
import { verifyToken } from "../utils/tokenGenerator.js";

const appRouter = Router();

// Primary routes
appRouter.use("/product", productRoutes);
appRouter.use("/cart", verifyToken, cartRoutes);
appRouter.use("/user", userRoutes);
appRouter.use("/address", verifyToken, addressRoutes);
appRouter.use("/order", verifyToken, orderRoutes);
appRouter.use("/admin", adminRoutes);

export default appRouter;
