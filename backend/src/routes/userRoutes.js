import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/create-new-user", createUser);
userRoutes.post("/login-user", loginUser);

export default userRoutes;
