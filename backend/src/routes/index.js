import { Router } from "express";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";

const appRouter = Router();

// Primary routes
appRouter.use("/product", productRoutes);
appRouter.use("/cart", cartRoutes);

export default appRouter;
