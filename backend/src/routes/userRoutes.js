import { Router } from "express";
import {
  authoriseUser,
  createUser,
  loginUser,
  logOutUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/tokenGenerator.js";

const userRoutes = Router();

userRoutes.post("/create-new-user", createUser);
userRoutes.post("/login-user", loginUser);
userRoutes.get("/authorise-user", verifyToken, authoriseUser);
userRoutes.get("/logout-user", verifyToken, logOutUser);

export default userRoutes;
