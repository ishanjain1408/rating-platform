import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Layout.css";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="nav-links">
          <Link to="/stores" className="nav-link">
            Stores
          </Link>
          {user?.role === "System Administrator" && (
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          )}
          {user?.role === "Store Owner" && (
            <Link to="/owner" className="nav-link">
              Owner
            </Link>
          )}
        </nav>

        <div className="auth-section">
          {user ? (
            <>
              <span className="user-info">
                {user.name} <span className="user-role">({user.role})</span>
              </span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/signup" className="auth-link">
                Signup
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="layout-main">{children}</main>
    </div>
  );
}
