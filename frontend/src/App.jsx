import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Login from "./pages/public/Login";
import LoginAdmin from "./pages/auth/LoginAdmin";
import PendaftaranAsesi from "./pages/public/Registration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifikasiPendaftaran from "./pages/admin/VerifikasiPendaftaran";
import DashboardAsesi from "./pages/public/Profile";

function App() {

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/pendaftaran" element={<PendaftaranAsesi />} />

        {/* ADMIN LAYOUT */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >

          {/* child routes */}
          <Route path="dashboard" element={<div />} />
          <Route path="verifikasi-pendaftaran" element={<VerifikasiPendaftaran />} />

        </Route>

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardAsesi />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
