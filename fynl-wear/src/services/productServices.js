import api from "./api";

export const getProducts = (category, sortBy) =>
  api.get(`product/get-products?category=${category}&sortBy=${sortBy}`);
