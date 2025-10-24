import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-row max-w-dvw h-screen">
      <ScrollToTop />
      <nav>
        <AdminNavbar />
      </nav>
      <main className="flex-grow flex flex-col max-w-dvw max-h-dvh overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
