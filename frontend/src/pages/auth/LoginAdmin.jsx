import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUserShield, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginAdmin.css"; // Kita akan buat CSS khusus

// Pastikan Anda mengarahkan ke URL backend yang benar
const API_URL = "http://localhost:3000/api/auth"; 

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- CEK ROLE KHUSUS ADMIN ---
        if (data.user.role !== 'admin') {
           Swal.fire({
            icon: "error",
            title: "Akses Ditolak",
            text: "Akun ini bukan akun Administrator!",
            confirmButtonColor: "#d33",
          });
          setIsLoading(false);
          return;
        }

        // Simpan token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          icon: "success",
          title: "Login Admin Berhasil",
          text: `Selamat datang kembali, ${data.user.nama}!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/admin/dashboard"); // Redirect ke Admin Dashboard
        });
      } else {
        throw new Error(data.message || "Login gagal");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message,
        confirmButtonColor: "#FF8A00",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-admin-container">
      <div className="login-admin-card">
        <div className="login-admin-header">
          <div className="admin-icon-circle">
            <FaUserShield />
          </div>
          <h2>Administrator</h2>
          <p>Login to access LSP Control Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-admin-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaUserShield className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="admin@lsp.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-admin-login" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "LOGIN TO DASHBOARD"}
          </button>
        </form>

        <div className="login-admin-footer">
          <button onClick={() => navigate("/login")} className="back-link">
            &larr; Back to User Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;