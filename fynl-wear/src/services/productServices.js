import api from "./api";

export const getProducts = async () => api.get("/get-products");
