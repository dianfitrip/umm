const jwt = require("jsonwebtoken");
const env = require("../config/env");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // Simpan data user (id, role) ke request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};

module.exports = { authenticate }; // Penting: Ekspor sebagai object