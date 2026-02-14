import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
// Import ikon profesional dari react-icons/fa (Font Awesome 5)
import { 
  FaThLarge, 
  FaClipboardCheck, 
  FaSitemap, 
  FaUserTie, 
  FaBuilding, 
  FaUsers, 
  FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();

  // Menu definition dengan komponen Ikon
  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaThLarge /> },
    { id: 'verifikasi', label: 'Verifikasi Pendaftaran', icon: <FaClipboardCheck /> },
    { id: 'skema', label: 'Manajemen Skema', icon: <FaSitemap /> },
    { id: 'asesor', label: 'Data Asesor', icon: <FaUserTie /> },
    { id: 'tuk', label: 'Data TUK', icon: <FaBuilding /> },
    { id: 'user', label: 'Manajemen User', icon: <FaUsers /> },
  ];

  const handleLogout = () => {
    // Tambahkan konfirmasi logout untuk kesan lebih profesional
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* Logo Box menggunakan warna utama oranye */}
        <div className="logo-box">A</div>
        <div className="logo-text">
          <h1>ADMIN PANEL</h1>
          <p>LSP System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">MENU UTAMA</div>
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
        <button onClick={handleLogout} className="nav-item logout">
          <span className="icon"><FaSignOutAlt /></span>
          <span className="label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;