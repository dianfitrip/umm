import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";  <-- Hapus atau jadikan komentar
import "./index.css"; // Pastikan file css global (biasanya index.css) tetap ada jika dibutuhkan

import Login from "./pages/public/Login";
import LoginAdmin from "./pages/auth/LoginAdmin";
import PendaftaranAsesi from "./pages/public/Registration"; 
import AdminDashboard from "./pages/admin/AdminDashboard";
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
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<Login />} />
        
        {/* --- ADMIN LOGIN ROUTE --- */}
        <Route path="/admin/login" element={<LoginAdmin />} /> 

        <Route path="/pendaftaran" element={<PendaftaranAsesi />} />

        {/* --- PROTECTED ROUTES --- */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardAsesi />
            </ProtectedRoute>
          }
        />

        {/* --- REDIRECTS --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div className="text-center mt-10">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;