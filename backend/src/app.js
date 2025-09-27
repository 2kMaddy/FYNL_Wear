import express from "express";
import { config } from "dotenv";
import cors from "cors";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

// config
config();
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// route
app.use("/api", appRouter);

export default app;
