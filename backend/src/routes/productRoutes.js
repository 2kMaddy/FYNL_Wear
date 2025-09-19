import { Router } from "express";
import {
  getProducts,
  createBulkProducts,
  deleteAllProducts,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.post("/create-bulk-products", createBulkProducts);
productRoutes.get("/get-products", getProducts);
productRoutes.delete("/delete-all-products", deleteAllProducts);

export default productRoutes;
