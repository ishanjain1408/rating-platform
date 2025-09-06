import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/stores"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Stores
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
