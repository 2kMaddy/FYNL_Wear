import { Router } from "express";
import productRouter from "./productRouter";

const appRouter = Router();

// Primary routes
appRouter.use("/product", productRouter);

export default appRouter;
