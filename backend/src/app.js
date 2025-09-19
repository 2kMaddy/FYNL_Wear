import express from "express";
import { config } from "dotenv";
import cors from "cors";
import appRouter from "./routes/index.js";

// config
config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// route
app.use("/api", appRouter);

export default app;
