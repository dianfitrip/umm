const express = require("express");
const router = express.Router();
// Pastikan path import ini BENAR
const authController = require("../controllers/auth/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware"); 

// Debugging: Cek apakah fungsi terbaca (Opsional, hapus nanti)
// console.log("Register Admin Fn:", authController.registerAdmin); 
// console.log("Middleware Fn:", authMiddleware.authenticate);

router.post("/register", authController.register);
router.post("/login", authController.login);

// Baris 14 (Kemungkinan Error di sini jika registerAdmin undefined)
router.post("/register-admin", authController.registerAdmin);

// Atau di sini jika authMiddleware.authenticate undefined
router.get("/me", authMiddleware.authenticate, authController.me);

module.exports = router;