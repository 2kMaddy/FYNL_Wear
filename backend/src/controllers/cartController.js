import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity, size, color } = req.body;
    const cart = await Cart.findOne({ userId });

    // If cart doesn't exist, create a new cart
    if (!cart) {
      const cartItems = [{ productId, quantity, size, color }];
      const newCart = await Cart.create({
        userId,
        cartItems,
      });

      return res.status(200).json({
        success: true,
        message: "Cart item added successfully",
        data: newCart,
      });
    }

    // If cart exists, update the cart
    const { cartItems } = cart;
    const existingProduct = cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cartItems.push({ productId, quantity, size, color });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart item added successfully",
      data: cart.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add cart item",
      error: error.message,
    });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
      });
    }

    const productIds = cart.cartItems.map((i) => i.productId);
    const products = await Product.find(
      { productId: { $in: productIds } },
      "productId name image1 price"
    );

    const productMap = new Map(products.map((p) => [p.productId, p]));

    const result = cart.cartItems.map((item) => ({
      ...item.toObject(),
      product: productMap.get(item.productId),
    }));

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get cart items",
      error: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { userId, cartItemId, quantity } = req.body;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId, "cartItems._id": cartItemId },
      { $set: { "cartItems.$.quantity": quantity } }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { cartItems: { _id: cartItemId } } }
    );

    if (updatedCart.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error: error.message,
    });
  }
};
