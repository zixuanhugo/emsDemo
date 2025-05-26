const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing' });
  }
  try {
    const token = auth.split(' ')[1];
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
