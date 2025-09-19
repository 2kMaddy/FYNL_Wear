import api from "./api";

export const getProducts = () => api.get("product/get-products");
