import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/user/Home.jsx";
import Products from "../pages/user/Products.jsx";
import ProductDetail from "../pages/user/ProductDetail.jsx";
import AuthForm from "../components/AuthForm.jsx";
import Cart from "../pages/user/Cart.jsx";
import PlaceOrder from "../pages/user/PlaceOrder.jsx";
import MyOrders from "../pages/user/MyOrders.jsx";

import AdminLogin from "../pages/admin/AdminLogin.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import AdminProducts from "../pages/admin/AdminProducts.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";

import AuthWrapper from "../components/Authwrapper.jsx";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <UserLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
      {
        path: "place-order",
        element: <PlaceOrder />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
    ],
  },
]);

export default AppRoutes;
