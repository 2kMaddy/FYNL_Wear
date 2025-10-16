import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => (
  <div className="flex flex-row">
    <ScrollToTop />
    <nav>
      <AdminNavbar />
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
