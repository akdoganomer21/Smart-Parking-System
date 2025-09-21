const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token eksik veya geçersiz" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // kullanıcı bilgilerini route'a aktar
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token doğrulanamadı" });
  }
};

module.exports = verifyToken;


