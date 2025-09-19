import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/products";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

export default AppRoutes;
