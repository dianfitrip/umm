import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from "../../services/api";
import { 
  Search, Plus, Eye, Edit2, Trash2, X, Save, 
  MapPin, Building, Hash, Phone, Mail, Globe 
} from 'lucide-react';
import './TempatUji.css'; // Import CSS baru

const TempatUji = () => {
  // --- STATE MANAGEMENT ---
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'edit', 'detail'
  
  // Wilayah State
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingWilayah, setLoadingWilayah] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id_tuk: '',
    kode_tuk: '',
    nama_tuk: '',
    jenis_tuk: 'Sewaktu',
    alamat: '',
    provinsi_id: '',
    provinsi_nama: '',
    kota_id: '',
    kota_nama: '',
    no_telp: '',
    email: '',
    website: '',
    is_active: true
  });

  // --- API CALLS ---
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/tuk');
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire('Gagal', 'Tidak dapat memuat data TUK', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await api.get('/public/wilayah/provinsi'); 
      setProvinces(response.data.data || []);
    } catch (error) {
      console.error("Gagal load provinsi:", error);
    }
  };

  const fetchCities = async (provId) => {
    if (!provId) { setCities([]); return; }
    setLoadingWilayah(true);
    try {
      const response = await api.get(`/public/wilayah/kota?provinsi_id=${provId}`);
      setCities(response.data.data || []);
    } catch (error) {
      console.error("Gagal load kota:", error);
    } finally {
      setLoadingWilayah(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProvinces();
  }, []);

  // Search Logic
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = data.filter(item => 
      item.nama_tuk.toLowerCase().includes(lower) || 
      item.kode_tuk.toLowerCase().includes(lower) ||
      (item.kota_nama && item.kota_nama.toLowerCase().includes(lower))
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // --- EVENT HANDLERS ---

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === 'edit' || type === 'detail') {
      setFormData(item);
      if (item.provinsi_id) fetchCities(item.provinsi_id);
    } else {
      setFormData({
        id_tuk: '', kode_tuk: '', nama_tuk: '', jenis_tuk: 'Sewaktu',
        alamat: '', provinsi_id: '', provinsi_nama: '', kota_id: '', kota_nama: '',
        no_telp: '', email: '', website: '', is_active: true
      });
      setCities([]);
    }
  };

  const closeModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProvinsiChange = (e) => {
    const index = e.target.selectedIndex;
    const id = e.target.value;
    const name = e.target.options[index].text;
    
    setFormData(prev => ({ 
      ...prev, 
      provinsi_id: id, 
      provinsi_nama: name, 
      kota_id: '', 
      kota_nama: '' 
    }));
    fetchCities(id);
  };

  const handleKotaChange = (e) => {
    const index = e.target.selectedIndex;
    const id = e.target.value;
    const name = e.target.options[index].text;
    setFormData(prev => ({ ...prev, kota_id: id, kota_nama: name }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!formData.kode_tuk || !formData.nama_tuk) {
      Swal.fire('Peringatan', 'Kode dan Nama TUK wajib diisi', 'warning');
      return;
    }

    try {
      if (modalType === 'create') {
        await api.post('/admin/tuk', formData);
        Swal.fire('Berhasil', 'Data TUK baru ditambahkan', 'success');
      } else {
        await api.put(`/admin/tuk/${formData.id_tuk}`, formData);
        Swal.fire('Berhasil', 'Data TUK diperbarui', 'success');
      }
      closeModal();
      fetchData();
    } catch (error) {
      Swal.fire('Error', 'Gagal menyimpan data', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Hapus Data?',
      text: "Data TUK akan dihapus permanen.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#CBD5E1',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin/tuk/${id}`);
        Swal.fire('Terhapus', 'Data berhasil dihapus', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Gagal', 'Terjadi kesalahan sistem', 'error');
      }
    }
  };

  // --- RENDER MODAL FORM ---
  const renderModalContent = () => {
    const readOnly = modalType === 'detail';

    return (
      <form onSubmit={handleSave}>
        <div className="form-grid">
          
          {/* Kiri: Identitas */}
          <div className="form-group">
            <label>Kode TUK <span className="required">*</span></label>
            <div className="input-wrapper">
              <Hash size={16} className="input-icon-left" />
              <input 
                type="text" className="form-input" name="kode_tuk"
                value={formData.kode_tuk} onChange={handleInputChange} disabled={readOnly}
                placeholder="Contoh: TUK-001"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Jenis TUK</label>
            <select className="form-select" name="jenis_tuk" value={formData.jenis_tuk} onChange={handleInputChange} disabled={readOnly}>
              <option value="Sewaktu">Sewaktu</option>
              <option value="Mandiri">Mandiri</option>
              <option value="Tempat Kerja">Tempat Kerja</option>
            </select>
          </div>

          <div className="form-group form-full">
            <label>Nama TUK <span className="required">*</span></label>
            <div className="input-wrapper">
              <Building size={16} className="input-icon-left" />
              <input 
                type="text" className="form-input" name="nama_tuk"
                value={formData.nama_tuk} onChange={handleInputChange} disabled={readOnly}
                placeholder="Nama Lengkap Tempat Uji Kompetensi"
              />
            </div>
          </div>

          {/* Kontak */}
          <div className="form-group">
            <label>No. Telepon</label>
            <div className="input-wrapper">
              <Phone size={16} className="input-icon-left" />
              <input 
                type="text" className="form-input" name="no_telp"
                value={formData.no_telp} onChange={handleInputChange} disabled={readOnly}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon-left" />
              <input 
                type="email" className="form-input" name="email"
                value={formData.email} onChange={handleInputChange} disabled={readOnly}
              />
            </div>
          </div>

          {/* Wilayah */}
          <div className="form-group">
            <label>Provinsi</label>
            <select className="form-select" name="provinsi_id" value={formData.provinsi_id} onChange={handleProvinsiChange} disabled={readOnly}>
              <option value="">-- Pilih Provinsi --</option>
              {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Kota/Kabupaten {loadingWilayah && "..."}</label>
            <select className="form-select" name="kota_id" value={formData.kota_id} onChange={handleKotaChange} disabled={readOnly || !formData.provinsi_id}>
              <option value="">-- Pilih Kota --</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group form-full">
            <label>Alamat Lengkap</label>
            <textarea 
              className="form-textarea" name="alamat"
              value={formData.alamat} onChange={handleInputChange} disabled={readOnly}
              placeholder="Jalan, Nomor Gedung, dsb."
            ></textarea>
          </div>

        </div>

        {!readOnly && (
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={closeModal}>Batal</button>
            <button type="submit" className="btn-save">
              <Save size={16} /> Simpan Data
            </button>
          </div>
        )}
      </form>
    );
  };

  // --- RENDER UTAMA ---
  return (
    <div className="tuk-container">
      
      {/* HEADER */}
      <div className="header-section">
        <div className="title-box">
          <h2>Data Tempat Uji (TUK)</h2>
          <p>Kelola data lokasi tempat uji kompetensi.</p>
        </div>
        <button className="btn-create" onClick={() => handleOpenModal('create')}>
          <Plus size={18} /> Tambah Data
        </button>
      </div>

      {/* FILTER */}
      <div className="filter-section">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Cari Kode atau Nama TUK..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th width="50" className="text-center">No</th>
              <th>Kode TUK</th>
              <th>Nama TUK</th>
              <th className="text-center">Jenis</th>
              <th>Alamat</th>
              <th>Wilayah</th>
              <th width="120" className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center" style={{padding: '40px'}}>Memuat Data...</td></tr>
            ) : filteredData.length === 0 ? (
              <tr><td colSpan="7" className="text-center" style={{padding: '40px'}}>Tidak ada data ditemukan.</td></tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id_tuk || index}>
                  <td className="text-center">{index + 1}</td>
                  <td><span className="badge-code">{item.kode_tuk}</span></td>
                  <td className="fw-bold">{item.nama_tuk}</td>
                  <td className="text-center">
                    <span className={`badge-type ${item.jenis_tuk.toLowerCase().replace(/\s/g, '')}`}>
                      {item.jenis_tuk}
                    </span>
                  </td>
                  <td className="text-muted" style={{maxWidth: '200px'}}>{item.alamat}</td>
                  <td>
                    <div style={{fontSize: '13px', fontWeight: 600}}>{item.kota_nama}</div>
                    <div className="text-muted" style={{fontSize: '11px'}}>{item.provinsi_nama}</div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action view" onClick={() => handleOpenModal('detail', item)} title="Lihat Detail">
                        <Eye size={16} />
                      </button>
                      <button className="btn-action edit" onClick={() => handleOpenModal('edit', item)} title="Edit Data">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-action delete" onClick={() => handleDelete(item.id_tuk)} title="Hapus Data">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>
                {modalType === 'create' && 'Tambah TUK Baru'}
                {modalType === 'edit' && 'Edit Data TUK'}
                {modalType === 'detail' && 'Detail Informasi TUK'}
              </h3>
              <button className="btn-close" onClick={closeModal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TempatUji;