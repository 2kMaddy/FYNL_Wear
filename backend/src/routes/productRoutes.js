import { Router } from "express";
import {
  getProducts,
  createBulkProducts,
  deleteAllProducts,
  getProductById,
} from "../controllers/productController.js";

const productRoutes = Router();

// Admin activities
productRoutes.post("/create-bulk-products", createBulkProducts);
productRoutes.delete("/delete-all-products", deleteAllProducts);

// User activities
productRoutes.get("/get-products", getProducts);
productRoutes.get("/get-product-by-id/:productId", getProductById);

export default productRoutes;
