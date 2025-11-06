const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES_IN = '7d';

// === Login ===
exports.login = (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Both ID and password are required',
    });
  }

  Auth.login([id, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({
        error: 'Authentication failed',
        message: 'Could not verify credentials. Please try again later.',
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid ID or password',
      });
    }

    const user = results[0];

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .json({
        id: user.id,
        name: user.name,
        role: user.role,
        message: 'Login successful',
      });
  });
};

// === Verify Token (used by frontend to check session) ===
exports.verifySession = (req, res) => {
  const token = req.cookies.token;

  console.log(token)

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No session token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.id, name: decoded.name, role: decoded.role });
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid session',
      message: 'Session expired or invalid. Please login again.',
    });
  }
};


// === Logout ===
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out successfully' });
};

