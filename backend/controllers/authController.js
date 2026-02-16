import Auth from '../models/Auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES_IN = '7d';

// === Login ===
const login = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Both ID and password are required',
    });
  }

  try {
    const user = await Auth.getUser(id);
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({
      id: user.id,
      name: user.name,
      role: user.role,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      error: 'Authentication failed',
      message: 'Could not verify credentials. Please try again later.',
    });
  }
};

// === Verify Session ===
const verifySession = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No session token provided',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.id, name: decoded.name, role: decoded.role });
  } catch (err) {
    console.error('Verify session error:', err);
    res.status(401).json({
      error: 'Invalid session',
      message: 'Session expired or invalid. Please login again.',
    });
  }
};

// === Logout ===
const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    });
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({
      error: 'Logout failed',
      message: 'Could not log out. Please try again later.',
    });
  }
};

export { login, logout, verifySession };
