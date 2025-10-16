import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div>
      <NavLink to="/dashboard">
        <li>Dashboard</li>
      </NavLink>
      <NavLink to="/products">
        <li>Products</li>
      </NavLink>
      <NavLink to="/orders">
        <li>Orders</li>
      </NavLink>
      <NavLink to="/users">
        <li>Users</li>
      </NavLink>
    </div>
  );
};

export default AdminNavbar;
