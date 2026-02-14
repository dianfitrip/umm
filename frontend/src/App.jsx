import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// --- IMPORT COMPONENTS ---
// Sesuaikan path ini dengan struktur folder 'frontend/src/pages/...' yang sebenarnya

// Public Pages
import Login from "./pages/public/Login";
// Asumsi: File Registration.jsx adalah PendaftaranAsesi
import PendaftaranAsesi from "./pages/public/Registration"; 

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Asesi Pages
// Note: Jika folder 'asesi' belum ada, pastikan Anda membuatnya atau arahkan ke komponen yang benar
// Jika belum ada, Anda bisa sementara mengarahkannya ke Profile atau komponen placeholder
import DashboardAsesi from "./pages/public/Profile"; // Placeholder sementara jika DashboardAsesi belum dibuat

function App() {
  // Cek token untuk proteksi route
  const isAuthenticated = () => {
    // Anda mungkin perlu logika yang lebih spesifik (misal cek role user vs admin)
    return localStorage.getItem("token") !== null;
  };

  // Komponen Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* --- ROUTE PUBLIC --- */}
        <Route path="/login" element={<Login />} />
        
        {/* Mengganti path /register menjadi /pendaftaran */}
        <Route path="/pendaftaran" element={<PendaftaranAsesi />} />

        {/* --- ROUTE ADMIN --- */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* --- ROUTE ASESI --- */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardAsesi />
            </ProtectedRoute>
          }
        />

        {/* --- REDIRECTS & 404 --- */}
        {/* Redirect root ke login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* 404 Page */}
        <Route path="*" element={<div className="text-center mt-10">Halaman tidak ditemukan (404)</div>} />
      </Routes>
    </Router>
  );
}

export default App;