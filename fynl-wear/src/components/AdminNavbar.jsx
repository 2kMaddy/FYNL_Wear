import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="flex flex-col p-5 w-45 h-dvh">
      <div>
        <img
          src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1755936903/Logo_Black-removebg-preview_dbskal.png"
          alt="logo"
          className="w-40 hidden lg:block"
        />
      </div>
      <ul className="flex flex-col gap-4 mt-10">
        <NavLink to="/admin/dashboard">
          <li>Dashboard</li>
        </NavLink>
        <NavLink to="/admin/products">
          <li>Products</li>
        </NavLink>
        <NavLink to="/admin/orders">
          <li>Orders</li>
        </NavLink>
        <NavLink to="/admin/users">
          <li>Users</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminNavbar;
