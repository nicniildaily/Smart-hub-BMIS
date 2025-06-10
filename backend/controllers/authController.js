const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, full_name: user.full_name }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    return res.json({ message: 'Login successful', userName: user.full_name, token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function logout(req, res) {
  // For JWT, logout can be handled on client side by deleting token
  return res.json({ message: 'Logout successful' });
}

module.exports = {
  login,
  logout,
};
