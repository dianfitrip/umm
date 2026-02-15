import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

import {
  FaThLarge,
  FaUserCheck,
  FaLayerGroup,
  FaUserTie,
  FaBuilding,
  FaUsers,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // dropdown state
  const [openAsesi, setOpenAsesi] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">

      {/* HEADER */}
      <div className="sidebar-header">
        <div className="logo-box">A</div>
        <div className="logo-text">
          <h1>ADMIN PANEL</h1>
          <p>LSP System</p>
        </div>
      </div>

      {/* NAV */}
      <div className="sidebar-nav">

        <div className="nav-section-label">Menu Utama</div>

        {/* Dashboard */}
        <button
          className={`nav-item ${isActive("/admin/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/admin/dashboard")}
        >
          <span className="icon"><FaThLarge /></span>
          <span className="label">Dashboard</span>
        </button>


        {/* ===== DROPDOWN ASESI ===== */}
        <button
          className="nav-item"
          onClick={() => setOpenAsesi(!openAsesi)}
        >
          <span className="icon"><FaUserCheck /></span>
          <span className="label">Asesi</span>
          <span style={{ marginLeft: "auto" }}>
            {openAsesi ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </button>

        {openAsesi && (
          <div style={{ paddingLeft: "20px" }}>

            <button
              className={`nav-item ${isActive("/admin/verifikasi-pendaftaran") ? "active" : ""}`}
              onClick={() => navigate("/admin/verifikasi-pendaftaran")}
            >
              <span className="label">Verifikasi Pendaftaran</span>
            </button>

            <button className="nav-item">
              <span className="label">Belum Terjadwal</span>
            </button>

            <button className="nav-item">
              <span className="label">Terjadwal</span>
            </button>

            <button className="nav-item">
              <span className="label">Pendaftar Tahun Lalu</span>
            </button>

            <button className="nav-item">
              <span className="label">Per Tahun Angkatan</span>
            </button>

            <button className="nav-item">
              <span className="label">Per Provinsi Asal</span>
            </button>

            <button className="nav-item">
              <span className="label">Per Kota/Kab. Asal</span>
            </button>

            <button className="nav-item">
              <span className="label">Berdasarkan Pengusul</span>
            </button>

            <button className="nav-item">
              <span className="label">Kompeten</span>
            </button>

            <button className="nav-item">
              <span className="label">Kompeten (Belum Sertifikat)</span>
            </button>

            <button className="nav-item">
              <span className="label">Kompeten (Arsip)</span>
            </button>

            <button className="nav-item">
              <span className="label">Belum Kompeten</span>
            </button>

            <button className="nav-item">
              <span className="label">Diblokir</span>
            </button>

          </div>
        )}


        {/* menu lain tetap */}
        <button className="nav-item">
          <span className="icon"><FaLayerGroup /></span>
          <span className="label">Manajemen Skema</span>
        </button>

        <button className="nav-item">
          <span className="icon"><FaUserTie /></span>
          <span className="label">Data Asesor</span>
        </button>

        <button className="nav-item">
          <span className="icon"><FaBuilding /></span>
          <span className="label">Data TUK</span>
        </button>

        <button className="nav-item">
          <span className="icon"><FaUsers /></span>
          <span className="label">Manajemen User</span>
        </button>

      </div>


      {/* FOOTER */}
      <div className="sidebar-footer">
        <button className="nav-item logout">
          <span className="icon"><FaSignOutAlt /></span>
          <span className="label">Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
