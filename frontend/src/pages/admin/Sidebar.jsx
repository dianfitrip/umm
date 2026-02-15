import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  FaHome, FaBullhorn, FaGavel, FaChartBar, FaUniversity, FaBook, FaAward, 
  FaLayerGroup, FaMoneyBillWave, FaCalendarAlt, FaBuilding, FaUserGraduate, 
  FaUserTie, FaUsersCog, FaCommentDots, FaGlobe, FaCogs, FaCalculator, 
  FaCreditCard, FaEnvelopeOpenText, FaEye, FaLock, FaSignOutAlt, 
  FaChevronDown, FaChevronRight
} from "react-icons/fa";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({
    laporan: false,
    standar: false,
    biaya: false,
    event: false,
    asesi: false,
    asesor: false,
    manajemen: false,
    pembayaran: false,
    persuratan: false
  });

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMenuClick = (key) => {
    setActiveMenu(key);
    // navigate(`/admin/${key}`);
  };

  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="logo-box">
          <FaUniversity className="logo-icon" />
        </div>
        <div className="logo-text">
          <h1>S.I.LSP</h1>
          <p>Sistem Informasi LSP</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="sidebar-content">
        
        {/* UTAMA */}
        <div className="nav-section-label">Utama</div>
        
        <button className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuClick('dashboard')}>
          <div className="nav-icon"><FaHome /></div>
          <span className="nav-label">Home / Dashboard</span>
        </button>

        {/* LAYANAN */}
        <button className={`nav-item ${activeMenu === 'pengaduan' ? 'active' : ''}`} onClick={() => handleMenuClick('pengaduan')}>
          <div className="nav-icon"><FaBullhorn /></div>
          <span className="nav-label">Layanan Pengaduan</span>
        </button>

        <button className={`nav-item ${activeMenu === 'banding' ? 'active' : ''}`} onClick={() => handleMenuClick('banding')}>
          <div className="nav-icon"><FaGavel /></div>
          <span className="nav-label">Layanan Banding</span>
        </button>

        {/* REPORTING (DROPDOWN) */}
        <div className="nav-section-label">Reporting</div>
        <button className={`nav-item has-submenu ${openMenus.laporan ? 'open' : ''}`} onClick={() => toggleMenu('laporan')}>
          <div className="nav-icon"><FaChartBar /></div>
          <span className="nav-label">Laporan Sertifikasi</span>
          <span className="arrow-icon">{openMenus.laporan ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.laporan && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('laporan-umum')}><span className="dot"></span> Laporan Umum</button>
            <button className="submenu-item" onClick={() => handleMenuClick('laporan-bulanan')}><span className="dot"></span> Laporan Bulanan</button>
            <button className="submenu-item" onClick={() => handleMenuClick('laporan-tahunan')}><span className="dot"></span> Laporan Tahunan</button>
            <button className="submenu-item" onClick={() => handleMenuClick('kinerja-asesor')}><span className="dot"></span> Kinerja Asesor</button>
            <button className="submenu-item" onClick={() => handleMenuClick('kinerja-tuk')}><span className="dot"></span> Kinerja TUK</button>
            <button className="submenu-item" onClick={() => handleMenuClick('feedback')}><span className="dot"></span> Umpan Balik</button>
          </div>
        )}

        {/* MASTER DATA */}
        <div className="nav-section-label">Master Data</div>
        <button className={`nav-item ${activeMenu === 'profil-lsp' ? 'active' : ''}`} onClick={() => handleMenuClick('profil-lsp')}>
          <div className="nav-icon"><FaUniversity /></div>
          <span className="nav-label">Profil LSP</span>
        </button>

        <button className={`nav-item ${activeMenu === 'dokumen-mutu' ? 'active' : ''}`} onClick={() => handleMenuClick('dokumen-mutu')}>
          <div className="nav-icon"><FaBook /></div>
          <span className="nav-label">Dokumen Mutu</span>
        </button>

        <button className={`nav-item has-submenu ${openMenus.standar ? 'open' : ''}`} onClick={() => toggleMenu('standar')}>
          <div className="nav-icon"><FaAward /></div>
          <span className="nav-label">Standar Kompetensi</span>
          <span className="arrow-icon">{openMenus.standar ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.standar && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('unit-kompetensi')}><span className="dot"></span> Unit Kompetensi</button>
            <button className="submenu-item" onClick={() => handleMenuClick('skkni')}><span className="dot"></span> Data SKKNI</button>
          </div>
        )}

        <button className={`nav-item ${activeMenu === 'skema' ? 'active' : ''}`} onClick={() => handleMenuClick('skema')}>
          <div className="nav-icon"><FaLayerGroup /></div>
          <span className="nav-label">Skema Sertifikasi</span>
        </button>

        <button className={`nav-item has-submenu ${openMenus.biaya ? 'open' : ''}`} onClick={() => toggleMenu('biaya')}>
          <div className="nav-icon"><FaMoneyBillWave /></div>
          <span className="nav-label">Biaya & Rekening</span>
          <span className="arrow-icon">{openMenus.biaya ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.biaya && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('rekening')}><span className="dot"></span> Rekening Bank</button>
            <button className="submenu-item" onClick={() => handleMenuClick('data-biaya')}><span className="dot"></span> Komponen Biaya</button>
          </div>
        )}

        {/* OPERASIONAL */}
        <div className="nav-section-label">Operasional</div>
        
        <button className={`nav-item has-submenu ${openMenus.event ? 'open' : ''}`} onClick={() => toggleMenu('event')}>
          <div className="nav-icon"><FaCalendarAlt /></div>
          <span className="nav-label">Event & Jadwal</span>
          <span className="arrow-icon">{openMenus.event ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.event && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('cari-jadwal')}><span className="dot"></span> Cari Jadwal</button>
            <button className="submenu-item" onClick={() => handleMenuClick('event-uji')}><span className="dot"></span> Event Uji Kompetensi</button>
            <button className="submenu-item" onClick={() => handleMenuClick('arsip-jadwal')}><span className="dot"></span> Arsip Jadwal</button>
          </div>
        )}

        <button className={`nav-item ${activeMenu === 'tuk' ? 'active' : ''}`} onClick={() => handleMenuClick('tuk')}>
          <div className="nav-icon"><FaBuilding /></div>
          <span className="nav-label">Tempat Uji (TUK)</span>
        </button>

        <button className={`nav-item has-submenu ${openMenus.asesi ? 'open' : ''}`} onClick={() => toggleMenu('asesi')}>
          <div className="nav-icon"><FaUserGraduate /></div>
          <span className="nav-label">Data Asesi</span>
          <span className="arrow-icon">{openMenus.asesi ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.asesi && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-cari')}><span className="dot"></span> Pencarian Asesi</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-baru')}><span className="dot"></span> Pendaftar Baru</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-terjadwal')}><span className="dot"></span> Terjadwal</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-kompeten')}><span className="dot"></span> Kompeten</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-belum-sertifikat')}><span className="dot"></span> Belum Sertifikat</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-arsip')}><span className="dot"></span> Arsip</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesi-blokir')}><span className="dot"></span> Diblokir</button>
          </div>
        )}

        <button className={`nav-item has-submenu ${openMenus.asesor ? 'open' : ''}`} onClick={() => toggleMenu('asesor')}>
          <div className="nav-icon"><FaUserTie /></div>
          <span className="nav-label">Data Asesor</span>
          <span className="arrow-icon">{openMenus.asesor ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.asesor && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('asesor-list')}><span className="dot"></span> Daftar Asesor</button>
            <button className="submenu-item" onClick={() => handleMenuClick('asesor-statistik')}><span className="dot"></span> Statistik Wilayah</button>
          </div>
        )}

        <button className={`nav-item ${activeMenu === 'komite' ? 'active' : ''}`} onClick={() => handleMenuClick('komite')}>
          <div className="nav-icon"><FaUsersCog /></div>
          <span className="nav-label">Komite Teknis</span>
        </button>

        {/* SISTEM & WEB */}
        <div className="nav-section-label">Sistem & Web</div>
        
        <button className={`nav-item ${activeMenu === 'notifikasi' ? 'active' : ''}`} onClick={() => handleMenuClick('notifikasi')}>
          <div className="nav-icon"><FaCommentDots /></div>
          <span className="nav-label">SMS / Notifikasi</span>
        </button>

        <button className={`nav-item ${activeMenu === 'website' ? 'active' : ''}`} onClick={() => handleMenuClick('website')}>
          <div className="nav-icon"><FaGlobe /></div>
          <span className="nav-label">Konten Website</span>
        </button>

        <button className={`nav-item has-submenu ${openMenus.manajemen ? 'open' : ''}`} onClick={() => toggleMenu('manajemen')}>
          <div className="nav-icon"><FaCogs /></div>
          <span className="nav-label">Manajemen Sistem</span>
          <span className="arrow-icon">{openMenus.manajemen ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.manajemen && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('manajemen-user')}><span className="dot"></span> Users</button>
            <button className="submenu-item" onClick={() => handleMenuClick('manajemen-pengusul')}><span className="dot"></span> Pengusul</button>
            <button className="submenu-item" onClick={() => handleMenuClick('manajemen-wa')}><span className="dot"></span> WhatsApp API</button>
            <button className="submenu-item" onClick={() => handleMenuClick('manajemen-bnsp')}><span className="dot"></span> Integrasi BNSP</button>
          </div>
        )}

        {/* KEUANGAN & ADMIN */}
        <div className="nav-section-label">Keuangan & Admin</div>

        <button className={`nav-item ${activeMenu === 'keuangan' ? 'active' : ''}`} onClick={() => handleMenuClick('keuangan')}>
          <div className="nav-icon"><FaCalculator /></div>
          <span className="nav-label">Keuangan</span>
        </button>

        <button className={`nav-item has-submenu ${openMenus.pembayaran ? 'open' : ''}`} onClick={() => toggleMenu('pembayaran')}>
          <div className="nav-icon"><FaCreditCard /></div>
          <span className="nav-label">Pembayaran</span>
          <span className="arrow-icon">{openMenus.pembayaran ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.pembayaran && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('bayar-cari')}><span className="dot"></span> Cari Pembayaran</button>
            <button className="submenu-item" onClick={() => handleMenuClick('bayar-validasi')}><span className="dot"></span> Validasi</button>
            <button className="submenu-item" onClick={() => handleMenuClick('bayar-lunas')}><span className="dot"></span> Tervalidasi</button>
          </div>
        )}

        <button className={`nav-item has-submenu ${openMenus.persuratan ? 'open' : ''}`} onClick={() => toggleMenu('persuratan')}>
          <div className="nav-icon"><FaEnvelopeOpenText /></div>
          <span className="nav-label">Persuratan</span>
          <span className="arrow-icon">{openMenus.persuratan ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        {openMenus.persuratan && (
          <div className="submenu">
            <button className="submenu-item" onClick={() => handleMenuClick('surat-sk')}><span className="dot"></span> SK & Tugas</button>
            <button className="submenu-item" onClick={() => handleMenuClick('surat-masuk')}><span className="dot"></span> Surat Masuk</button>
            <button className="submenu-item" onClick={() => handleMenuClick('surat-keluar')}><span className="dot"></span> Surat Keluar</button>
            <button className="submenu-item" onClick={() => handleMenuClick('surat-mou')}><span className="dot"></span> MoU / MoA</button>
          </div>
        )}

        <button className={`nav-item ${activeMenu === 'surveillance' ? 'active' : ''}`} onClick={() => handleMenuClick('surveillance')}>
          <div className="nav-icon"><FaEye /></div>
          <span className="nav-label">Surveillance</span>
        </button>

        {/* ACCOUNT */}
        <div className="nav-section-label">Akun</div>
        <button className={`nav-item ${activeMenu === 'ubah-sandi' ? 'active' : ''}`} onClick={() => handleMenuClick('ubah-sandi')}>
          <div className="nav-icon"><FaLock /></div>
          <span className="nav-label">Ubah Sandi</span>
        </button>

      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button className="nav-item logout">
          <div className="nav-icon"><FaSignOutAlt /></div>
          <span className="nav-label">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;