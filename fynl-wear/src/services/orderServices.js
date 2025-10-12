import api from "./api";

export const createOrder = (orderObject) =>
  api.post("/order/create-order", orderObject);

export const paymentVerification = (response) =>
  api.post("/order/verify-payment", response);

export const getOrdersById = (userId) =>
  api.get(`/order/get-order-by-id/${userId}`);
