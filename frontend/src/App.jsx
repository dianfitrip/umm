import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// --- IMPORTS ---
import Login from "./pages/public/Login";
import LoginAdmin from "./pages/auth/LoginAdmin";
import PendaftaranAsesi from "./pages/public/Registration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifikasiPendaftaran from "./pages/admin/VerifikasiPendaftaran";
import DashboardAsesi from "./pages/public/Profile";

// Pastikan path import ini sesuai dengan lokasi file Anda
import TempatUji from "./pages/admin/TempatUji"; 

function App() {

  const isAuthenticated = () => {
    // Cek token (sederhana)
    return localStorage.getItem("token") !== null; 
  };

  // Wrapper untuk proteksi route
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/admin/login" replace />; 
    }
    return children;
  };

  return (
    <Router>
      <Routes>

        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/pendaftaran" element={<PendaftaranAsesi />} />
      

        {/* --- ADMIN LAYOUT & ROUTES --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Default redirect jika buka /admin saja */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Route "dashboard" diisi null karena AdminDashboard.jsx sudah handle tampilannya */}
          <Route path="dashboard" element={null} /> 
          
          {/* Menu Lainnya */}
          <Route path="verifikasi-pendaftaran" element={<VerifikasiPendaftaran />} />
          
          {/* PERBAIKAN: Ganti <button> menjadi <Route> */}
          <Route path="asesi/list" element={<div>Halaman Daftar Asesi</div>} /> 
          
          {/* Route TUK yang baru dibuat */}
          <Route path="tuk" element={<TempatUji />} />

        </Route>


        {/* --- USER DASHBOARD --- */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardAsesi />
            </ProtectedRoute>
          }
        />

        {/* --- ROOT REDIRECT --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Not Found (Opsional) */}
        <Route path="*" element={<div>404 Page Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;