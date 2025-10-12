import { Router } from "express";
import { adminRegistration } from "../controllers/adminController.js";

const adminRoutes = Router();

adminRoutes.post("/admin-registration", adminRegistration);

export default adminRoutes;
