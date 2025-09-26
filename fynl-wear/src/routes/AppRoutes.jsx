import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Products from "../pages/Products.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";

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
    ],
  },
]);

export default AppRoutes;
