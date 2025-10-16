import api from "./api";

export const loginAdmin = (email, password) =>
  api.post("admin/admin-login", { email, password });
