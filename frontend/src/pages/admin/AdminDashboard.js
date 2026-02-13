import React, { useState } from 'react';
import Sidebar from './Sidebar';
import VerifikasiPendaftaran from './VerifikasiPendaftaran';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Menu default langsung ke Verifikasi Pendaftaran
  const [activeMenu, setActiveMenu] = useState('verifikasi');

  return (
    <div className="admin-layout">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <main className="main-content">
        <header className="top-header">
          <h3>
            {activeMenu === 'verifikasi' ? 'VERIFIKASI PENDAFTARAN' : activeMenu.toUpperCase()}
          </h3>
          <div className="admin-profile">
            <div className="admin-info">
              <span className="name">Admin Utama</span>
              <span className="role">Administrator</span>
            </div>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="content-area">
          {/* Render Halaman Verifikasi */}
          {activeMenu === 'verifikasi' && <VerifikasiPendaftaran />}
          
          {/* Placeholder menu lain */}
          {activeMenu === 'dashboard' && (
            <div className="placeholder">
              <h3>Dashboard Overview</h3>
              <p>Grafik pendaftar akan tampil di sini.</p>
            </div>
          )}
          
          {['skema', 'asesor', 'tuk', 'user'].includes(activeMenu) && (
            <div className="placeholder">
              🚧 Fitur {activeMenu} sedang dalam pengembangan.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;