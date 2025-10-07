import { Router } from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";

const addressRoutes = Router();

addressRoutes.post("/add-address", addAddress);
addressRoutes.get("/get-address/:userId", getAddress);

export default addressRoutes;
