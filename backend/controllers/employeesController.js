const Employees = require('../models/Employees');

async function getAllEmployees(req, res) {
  try {
    const employees = await Employees.findAll();
    return res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getEmployeeById(req, res) {
  try {
    const id = req.params.id;
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createEmployee(req, res) {
  try {
    const { full_name, position, phone, email } = req.body;
    if (!full_name || !position) {
      return res.status(400).json({ error: 'Full name and position are required' });
    }
    const newEmployee = await Employees.create({ full_name, position, phone, email });
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateEmployee(req, res) {
  try {
    const id = req.params.id;
    const { full_name, position, phone, email } = req.body;
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    employee.full_name = full_name || employee.full_name;
    employee.position = position || employee.position;
    employee.phone = phone || employee.phone;
    employee.email = email || employee.email;
    await employee.save();
    return res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteEmployee(req, res) {
  try {
    const id = req.params.id;
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await employee.destroy();
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
