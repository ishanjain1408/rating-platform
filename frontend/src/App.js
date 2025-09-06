import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StoreListPage from "./pages/Store/StoreListPage";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/stores" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/admin/*"
        
          element={
            <ProtectedRoute roles={["System Administrator"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <ProtectedRoute
              roles={["Normal User", "System Administrator", "Store Owner"]}
            >
              <StoreListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/*"
          element={
            <ProtectedRoute roles={["Store Owner", "System Administrator"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<div style={{ padding: 20 }}>404 Not Found</div>}
        />
      </Routes>
    </Layout>
  );
}
