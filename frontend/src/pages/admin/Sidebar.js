import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'verifikasi', label: 'Verifikasi Pendaftaran', icon: '✅' }, // Menu Utama Admin
    { id: 'skema', label: 'Manajemen Skema', icon: '📜' },
    { id: 'asesor', label: 'Data Asesor', icon: '👨‍⚖️' },
    { id: 'tuk', label: 'Data TUK', icon: '🏢' },
    { id: 'user', label: 'Manajemen User', icon: '👥' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token admin
    window.location.href = '/login'; // Redirect ke login (asumsi admin login lewat sini juga/halaman khusus)
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">A</div>
        <div className="logo-text">
          <h1>ADMIN PANEL</h1>
          <p>LSP System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => setActiveMenu(menu.id)}
            className={`nav-item ${activeMenu === menu.id ? 'active' : ''}`}
          >
            <span className="icon">{menu.icon}</span>
            <span className="label">{menu.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          🚪 Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;