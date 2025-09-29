import { Router } from "express";
import {
  authoriseUser,
  createUser,
  loginUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/tokenGenerator.js";

const userRoutes = Router();

userRoutes.post("/create-new-user", createUser);
userRoutes.post("/login-user", loginUser);
userRoutes.get("/authorise-user", verifyToken, authoriseUser);

export default userRoutes;
