import api from "./api.js";

export const addAddress = (addressData) =>
  api.post("address/add-address", addressData);

export const getAddress = (userId) => api.get(`address/get-address/${userId}`);
