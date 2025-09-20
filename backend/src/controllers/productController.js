import Product from "../models/Product.js";

// Admin activities
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

export const deleteAllProducts = async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// User activities
export const getProducts = async (req, res) => {
  try {
    const { sortBy, category } = req.query;
    console.log(category);

    let query = {};
    if (sortBy === "oldest") {
      query.createdAt = 1;
    } else if (sortBy === "topRated") {
      query.rating = -1;
    } else if (sortBy === "priceHighToLow") {
      query.price = -1;
    } else if (sortBy === "priceLowToHigh") {
      query.price = 1;
    } else {
      query.createdAt = -1;
    }

    let findQuery = {};
    if (category === "allProducts") {
      findQuery = {};
    } else if (category) {
      findQuery.category = category;
    }

    const products = await Product.find(findQuery).sort(query);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      totalProducts: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal error",
      error: error.message,
    });
  }
};
