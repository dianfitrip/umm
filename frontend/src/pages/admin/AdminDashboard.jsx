import React, { useState } from 'react';
import Sidebar from './Sidebar';
// Import komponen-komponen konten admin Anda di sini nanti

const AdminDashboard = () => {
  // State untuk melacak menu mana yang sedang aktif
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Fungsi untuk merender konten berdasarkan menu yang aktif
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <div className="p-6"><h2>Dashboard Overview</h2><p>Selamat datang di panel admin.</p></div>;
      case 'verifikasi':
        return <div className="p-6"><h2>Verifikasi Pendaftaran</h2><p>Halaman verifikasi asesor/asesi.</p></div>;
      case 'skema':
        return <div className="p-6"><h2>Manajemen Skema</h2><p>CRUD Data Skema.</p></div>;
      // ... tambahkan case lain untuk asesor, tuk, user
      default:
        return <div className="p-6"><h2>Halaman tidak ditemukan</h2></div>;
    }
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
      {/* Sidebar diletakkan di kiri */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten Utama diletakkan di kanan */}
      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '20px' }}>
        {/* Header Sederhana untuk Konten Utama */}
        <header style={{ 
            marginBottom: '24px', 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            borderBottom: '2px solid #FF8A00', // Aksen garis oranye di header
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
                {/* Mengubah huruf pertama jadi kapital */}
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1).replace('-', ' ')}
            </h1>
        </header>
        
        {/* Area Konten yang Berubah-ubah */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
             {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;