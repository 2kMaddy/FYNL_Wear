import api from "./api";

export const addToCart = (userId, productId, quantity, size) =>
  api.post("/cart/add-to-cart", {
    userId,
    productId,
    quantity,
    size,
  });

export const getCart = (userId) => api.get(`/cart/get-cart/${userId}`);
