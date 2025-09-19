import { Router } from "express";
import productRoutes from "./productRoutes.js";

const appRouter = Router();

// Primary routes
appRouter.use("/product", productRoutes);

export default appRouter;
