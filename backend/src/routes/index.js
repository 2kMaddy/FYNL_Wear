import { Router } from "express";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import userRoutes from "./userRoutes.js";

const appRouter = Router();

// Primary routes
appRouter.use("/product", productRoutes);
appRouter.use("/cart", cartRoutes);
appRouter.use("/user", userRoutes);

export default appRouter;
