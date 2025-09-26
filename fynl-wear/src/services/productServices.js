import api from "./api";

export const getProducts = (category, sortBy, page) => {
  return api.get(
    `product/get-products?category=${category}&sortBy=${sortBy}&page=${page}&limit=12`
  );
};

export const getProductById = (productId) => {
  return api.get(`product/get-product-by-id/${productId}`);
};
