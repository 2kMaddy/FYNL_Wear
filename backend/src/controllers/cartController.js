import Cart from "../models/Cart.js";

export const addCartItem = async (req, res) => {
  try {
    const { cartItem } = req.body;
    const result = await Cart.insertOne(cartItem);
    return res.status(200).json({
      success: true,
      message: "Cart item added successfully",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add cart item",
      error: error.message,
    });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};
