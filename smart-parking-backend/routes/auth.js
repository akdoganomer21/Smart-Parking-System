const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// 👉 POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co|info|biz|io|me|tech)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Geçersiz e-posta formatı" });
    }

    const passwordErrors = [];
    if (password.length < 8) passwordErrors.push("En az 8 karakter olmalı");
    if (!/[A-Z]/.test(password)) passwordErrors.push("En az 1 büyük harf içermeli");
    if (!/[a-z]/.test(password)) passwordErrors.push("En az 1 küçük harf içermeli");
    if (!/[0-9]/.test(password)) passwordErrors.push("En az 1 rakam içermeli");

    if (passwordErrors.length > 0) {
      return res.status(400).json({ message: "Şifre kurallarına uymuyor", errors: passwordErrors });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Kayıt başarılı!" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

// 👉 POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Geçersiz e-posta" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Geçersiz şifre" });

    // ✅ Kullanıcı adı da token içine eklendi
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,        // ✅ EKLENDİ
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

// 🔐 GET /api/auth/protected
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Gizli veriye erişim sağlandı",
    user: req.user,
  });
});

module.exports = router;