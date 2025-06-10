const express = require('express');
const router = express.Router();
const { getBusinessDetails, getClients } = require('../controllers/adminController');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeesController');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');
const { getSalesReport } = require('../controllers/salesController');
const requireAuth = require('../middleware/requireAuth');

router.get('/business-details', requireAuth, getBusinessDetails);
router.get('/clients', requireAuth, getClients);

// Employee management routes
router.get('/employees', requireAuth, getAllEmployees);
router.get('/employees/:id', requireAuth, getEmployeeById);
router.post('/employees', requireAuth, createEmployee);
router.put('/employees/:id', requireAuth, updateEmployee);
router.delete('/employees/:id', requireAuth, deleteEmployee);

// Product and service routes
router.get('/products', requireAuth, getAllProducts);
router.post('/products', requireAuth, createProduct);
router.put('/products/:id', requireAuth, updateProduct);
router.delete('/products/:id', requireAuth, deleteProduct);

// Sales monitoring route
router.get('/sales-report', requireAuth, getSalesReport);

module.exports = router;
