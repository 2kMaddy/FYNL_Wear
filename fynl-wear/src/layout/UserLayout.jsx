import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
