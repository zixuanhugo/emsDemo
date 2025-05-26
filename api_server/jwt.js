const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '2h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

// 中介函式：驗證 Authorization Bearer Token
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token not provided' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { generateToken, authMiddleware };
