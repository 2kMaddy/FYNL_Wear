import { Router } from "express";
import {
  adminLogin,
  adminRegistration,
} from "../controllers/adminController.js";

const adminRoutes = Router();

adminRoutes.post("/admin-registration", adminRegistration);
adminRoutes.post("/admin-login", adminLogin);

export default adminRoutes;
