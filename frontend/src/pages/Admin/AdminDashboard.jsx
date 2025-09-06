import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import UsersPage from "./Sidebar/UsersPage";
import StoresPage from "./Sidebar/StoresPage";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="users" replace />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
