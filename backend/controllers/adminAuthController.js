const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admins = require('../models/Admins');

async function login(req, res) {
  try {
    const { phone_number, pin } = req.body;
    if (!phone_number || !pin) {
      return res.status(400).json({ error: 'Phone number and pin are required' });
    }

    const admin = await Admins.findOne({ where: { phone_number } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid phone number or pin' });
    }

    // Compare pin with hashed_pin if hashed_pin exists, else compare directly
    let pinMatch = false;
    if (admin.hashed_pin) {
      pinMatch = await bcrypt.compare(pin.toString(), admin.hashed_pin);
    } else {
      pinMatch = admin.pin.toString() === pin.toString();
    }

    if (!pinMatch) {
      return res.status(401).json({ error: 'Invalid phone number or pin' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.admin_id, name: admin.name, company_name: admin.company_name },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return res.json({ message: 'Login successful', adminName: admin.name, token });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function signup(req, res) {
  try {
    const { company_name, email, adress, phone_number, name, password } = req.body;
    if (!company_name || !email || !adress || !phone_number || !name || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if admin with email already exists
    const existingAdmin = await Admins.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admins.create({
      company_name,
      email,
      adress,
      phone_number,
      name,
      pin: null,
      hashed_pin: hashedPassword,
      created_at: new Date(),
    });

    return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Admin signup error:', error);
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
  signup,
};
