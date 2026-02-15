import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import {
  FaLayerGroup,
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaEllipsisV,
  FaCalendarAlt
} from "react-icons/fa";

// --- SUB-COMPONENT: KONTEN DASHBOARD ---
const DashboardOverview = () => {
  // Ambil tahun secara otomatis
  const currentYear = new Date().getFullYear();

  // Data Statistik (Resume)
  const stats = [
    { label: "Total Skema", value: "12", icon: <FaLayerGroup />, color: "orange" },
    { label: "Total Asesor", value: "45", icon: <FaUserTie />, color: "blue" },
    { label: "Total Asesi", value: "1,250", icon: <FaUsers />, color: "green" },
    { label: "Data TUK", value: "8", icon: <FaBuilding />, color: "purple" },
  ];

  // Data Dummy untuk Tabel
  const recentRegistrations = [
    { name: "Budi Santoso", schema: "Pemrograman Web", date: "16 Feb 2026", status: "Menunggu" },
    { name: "Siti Aminah", schema: "Desain Grafis", date: "16 Feb 2026", status: "Verifikasi" },
    { name: "Andi Saputra", schema: "Jaringan Komputer", date: "15 Feb 2026", status: "Diterima" },
    { name: "Dewi Lestari", schema: "Digital Marketing", date: "15 Feb 2026", status: "Ditolak" },
    { name: "Rizky Pratama", schema: "Pemrograman Web", date: "14 Feb 2026", status: "Diterima" },
  ];

  return (
    <div className="dashboard-container">
      
      {/* 1. STATS CARDS (RESUME) - Dikembalikan tanpa badge +5% */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className={`stat-icon bg-${item.color}`}>
              {item.icon}
            </div>
            <div className="stat-info">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
            {/* Bagian Trend (+5%) sudah dihapus di sini */}
          </div>
        ))}
      </div>

      {/* 2. CHARTS SECTION */}
      <div className="charts-grid">
        
        {/* Chart 1: Pendaftar & Kandidat (Judul Dinamis) */}
        <div className="card-box">
          <div className="card-header-inner">
            {/* TAHUN OTOMATIS BERUBAH */}
            <h4>Pendaftar dan Kandidat Tahun {currentYear}</h4>
            <button className="btn-icon-small"><FaEllipsisV /></button>
          </div>
          <div className="bar-chart-list">
            <div className="bar-item">
              <span>Web Dev</span>
              <div className="progress-track"><div className="progress-fill" style={{width: '85%'}}></div></div>
              <span className="val">850</span>
            </div>
            <div className="bar-item">
              <span>Jaringan</span>
              <div className="progress-track"><div className="progress-fill" style={{width: '60%'}}></div></div>
              <span className="val">600</span>
            </div>
            <div className="bar-item">
              <span>Desain</span>
              <div className="progress-track"><div className="progress-fill" style={{width: '45%'}}></div></div>
              <span className="val">450</span>
            </div>
            <div className="bar-item">
              <span>Admin</span>
              <div className="progress-track"><div className="progress-fill" style={{width: '75%'}}></div></div>
              <span className="val">750</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Persentase Kelulusan */}
        <div className="card-box">
          <div className="card-header-inner">
            <h4>Persentase Kelulusan</h4>
            <button className="btn-icon-small"><FaEllipsisV /></button>
          </div>
          <div className="pie-chart-container">
            <div className="pie-chart" style={{ background: `conic-gradient(#FF8A00 0% 70%, #F3F4F6 70% 100%)` }}>
              <div className="pie-center">
                <span>70%</span>
                <small>Kompeten</small>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><span className="dot orange"></span> Kompeten</div>
              <div className="legend-item"><span className="dot gray"></span> Belum Kompeten</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABLE & SCHEDULE */}
      <div className="bottom-grid">
        {/* Table Registrasi */}
        <div className="card-box table-section">
          <div className="card-header-inner">
            <h4>Pendaftaran Terbaru</h4>
            <a href="#" className="link-text">Lihat Semua</a>
          </div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Nama Asesi</th>
                <th>Skema</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.map((row, idx) => (
                <tr key={idx}>
                  <td className="fw-bold">{row.name}</td>
                  <td>{row.schema}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`badge ${row.status.toLowerCase()}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Jadwal Terdekat */}
        <div className="card-box schedule-section">
          <div className="card-header-inner">
            <h4>Jadwal Asesmen</h4>
            <FaCalendarAlt className="text-muted" />
          </div>
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="date-box">
                <span className="d">18</span><span className="m">FEB</span>
              </div>
              <div className="info">
                <h5>Uji Kompetensi Web</h5>
                <p>08:00 WIB • Lab 1</p>
              </div>
            </div>
            <div className="schedule-item">
              <div className="date-box">
                <span className="d">20</span><span className="m">FEB</span>
              </div>
              <div className="info">
                <h5>Uji Komp. Jaringan</h5>
                <p>09:00 WIB • Lab 2</p>
              </div>
            </div>
            <div className="schedule-item">
              <div className="date-box">
                <span className="d">25</span><span className="m">FEB</span>
              </div>
              <div className="info">
                <h5>Asesmen Mandiri</h5>
                <p>13:00 WIB • Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT: ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userData, setUserData] = useState({ name: 'Admin', role: 'Administrator' });

  // Ambil data user dari LocalStorage saat component dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          name: parsedUser.name || parsedUser.username || 'Admin',
          role: parsedUser.role || 'Administrator'
        });
      } catch (e) {
        console.error("Gagal parsing data user", e);
      }
    }
  }, []);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'verifikasi':
        return <div className="p-6"><h2>Halaman Verifikasi</h2></div>;
      case 'skema':
        return <div className="p-6"><h2>Halaman Skema</h2></div>;
      case 'asesor':
        return <div className="p-6"><h2>Halaman Asesor</h2></div>;
      case 'profile':
        return <div className="p-6"><h2>Profil Admin</h2><p>Halaman pengaturan profil admin.</p></div>;
      default:
        return (
          <div className="empty-state">
            <h2>{activeMenu.replace('-', ' ').toUpperCase()}</h2>
            <p>Halaman ini sedang dalam pengembangan.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <main className="main-content">
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="header-title">
            <h3>{activeMenu === 'dashboard' ? 'Dashboard Overview' : activeMenu.replace(/-/g, ' ').toUpperCase()}</h3>
            <p className="subtitle">Selamat datang kembali, {userData.name}.</p>
          </div>
          
          <div className="header-actions">
            
            {/* BUTTON NOTIFIKASI LONCENG SUDAH DIHAPUS */}
            
            {/* USER PROFILE - KLIK UNTUK KE HALAMAN PROFILE */}
            <div 
              className="user-profile clickable" 
              onClick={() => setActiveMenu('profile')}
              title="Lihat Profil"
              style={{ cursor: 'pointer' }}
            >
              <div className="text-right">
                <span className="name">{userData.name}</span>
                <span className="role">{userData.role}</span>
              </div>
              <div className="avatar">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT */}
        <div className="content-area">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;