import { Router } from "express";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import userRoutes from "./userRoutes.js";
import addressRoutes from "./addressRoute.js";
import orderRoutes from "./orderRoutes.js";

const appRouter = Router();

// Primary routes
appRouter.use("/product", productRoutes);
appRouter.use("/cart", cartRoutes);
appRouter.use("/user", userRoutes);
appRouter.use("/address", addressRoutes);
appRouter.use("/order", orderRoutes);

export default appRouter;
