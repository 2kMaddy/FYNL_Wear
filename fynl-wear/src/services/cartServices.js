import api from "./api";

export const addToCart = (userId, productId, quantity, size, color) =>
  api.post("/cart/add-to-cart", {
    userId,
    productId,
    quantity,
    size,
    color,
  });

export const getCart = (userId) => api.get(`/cart/get-cart/${userId}`);

export const deleteCartItem = (userId, cartItemId) =>
  api.delete(`/cart/delete-cart-item/${userId}/${cartItemId}`);

export const updateCartItem = (userId, cartItemId, quantity) =>
  api.put("/cart/update-cart-item", { userId, cartItemId, quantity });
