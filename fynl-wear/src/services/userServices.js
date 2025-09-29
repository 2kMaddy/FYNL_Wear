import api from "./api";

export const createNewUser = (name, email, password) =>
  api.post("/user/create-new-user", {
    name,
    email,
    password,
  });

export const logInUser = (email, password) =>
  api.post("/user/login-user", { email, password });

export const authoriseUser = () => api.get("/user/authorise-user");

export const logOutUser = () => api.get("/user/logout-user");
