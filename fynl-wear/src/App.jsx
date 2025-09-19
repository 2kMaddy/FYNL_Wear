import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  console.log("Hello world");
  return <RouterProvider router={AppRoutes} />;
};

export default App;
