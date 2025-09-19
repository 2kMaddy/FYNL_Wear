import Product from "../models/Product.js";

export const createBulkProducts = async (req, res) => {
  try {
    const { product } = req.body;
    const products = await Product.insertOne(product);
    return res.status(200).json({
      success: true,
      message: "Products created successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add products",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      totalProducts: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      s,
    });
  }
};
