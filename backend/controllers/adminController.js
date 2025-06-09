const Admins = require('../models/Admins');
const Users = require('../models/Users');

async function getBusinessDetails(req, res) {
  try {
    const adminId = req.adminId; // Assuming adminId is set in auth middleware

    // Fetch admin business details
    const admin = await Admins.findByPk(adminId, {
      attributes: ['company_name', 'email', 'adress', 'phone_number', 'name'],
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Count total users as total customers (no direct relation)
    const totalCustomers = await Users.count();

    return res.json({
      businessDetails: admin,
      totalCustomers,
    });
  } catch (error) {
    console.error('Error fetching business details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getClients(req, res) {
  try {
    const clients = await Users.findAll({
      attributes: ['id', 'full_name', 'email', 'phone'],
    });
    return res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getBusinessDetails,
  getClients,
};
