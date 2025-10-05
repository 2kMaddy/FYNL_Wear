import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Products from "../pages/Products.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import AuthForm from "../components/AuthForm.jsx";
import Cart from "../pages/Cart.jsx";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
      },
      {
        path: "login",
        element: <AuthForm formType="login" />,
      },
      {
        path: "signup",
        element: <AuthForm formType="signup" />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default AppRoutes;
