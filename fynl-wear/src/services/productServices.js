import api from "./api";

export const getProducts = (category, sortBy, page, limit) => {
  return api.get(
    `product/get-products?category=${category}&sortBy=${sortBy}&page=${page}&limit=${limit}`
  );
};

export const getProductById = (productId) => {
  return api.get(`product/get-product-by-id/${productId}`);
};
