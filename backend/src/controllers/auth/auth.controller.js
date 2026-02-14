const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");

// --- REGISTER USER (ASESI) ---
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Cek email user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Create User (Role default: user)
    const newUser = await User.create({
      nama,
      email,
      password, // Password akan di-hash oleh hooks di model
      role: 'user',
      is_active: true
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.id_user,
        nama: newUser.nama,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// --- REGISTER ADMIN (KHUSUS POSTMAN/SEEDING) ---
exports.registerAdmin = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Cek email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // Create User dengan Role ADMIN
    const newAdmin = await User.create({
      nama,
      email,
      password,
      role: 'admin', // Force role admin
      is_active: true
    });

    res.status(201).json({
      message: "Admin berhasil didaftarkan",
      data: {
        id: newAdmin.id_user,
        nama: newAdmin.nama,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });

  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({ message: "Gagal mendaftarkan admin", error: error.message });
  }
};

// --- LOGIN (UMUM: USER & ADMIN) ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari User berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // 2. Cek Password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // 3. Generate Token
    const token = jwt.sign(
      { id: user.id_user, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES || '1d' }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id_user,
        nama: user.nama,
        email: user.email,
        role: user.role,
        // Pastikan profile_picture ada jika model mendukungnya, atau default null
        profile_picture: user.profile_picture || null 
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// --- GET CURRENT USER (ME) ---
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};