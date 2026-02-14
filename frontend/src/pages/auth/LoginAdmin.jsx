import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../utils/api";
import "./Login.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State toggle mata
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  
  const navigate = useNavigate();
  // Pastikan .env sudah benar
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (token) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Mohon centang 'Saya bukan robot' (reCAPTCHA).");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username: identifier, 
        password: password
      });

      if (response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);

        // Redirect sesuai role
        if (user.role === 'admin') {
          navigate("/admin/dashboard");
        } else if (user.role === 'asesi') {
          navigate("/dashboard");
        } else {
          navigate("/dashboard"); 
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.message || "Login gagal. Periksa username dan password Anda.";
      setError(msg);
      
      if(captchaRef.current) {
         captchaRef.current.reset();
         setCaptchaToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Selamat Datang</h2>
          <p>Silakan login untuk mengakses akun Anda</p>
        </div>

        {error && <div className="login-alert">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder="Masukkan username"
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password"
                className="form-input password-input"
              />
              
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  // IKON MATA TERBUKA (Saat password terlihat)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  // IKON MATA DICORET / SLICED (Saat password tersembunyi)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="recaptcha-wrapper">
             <ReCAPTCHA
                ref={captchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
             />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Memproses..." : "Masuk Sekarang"}
          </button>
        </form>
        
        <div className="login-footer">
            <p>Belum memiliki akun? <a href="/register">Daftar Akun Baru</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;