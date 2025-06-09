const sequelize = require('../utils/sequerize');
const Users = require('./Users');
const Admins = require('./Admins');
const History = require('./History');
const Posts = require('./Posts');
const Appointments = require('./Appointments');
const ServicesProducts = require('./ServicesProducts');
const Plans = require('./Plans');
const BillingInvoices = require('./BillingInvoices');
const Employees = require('./Employees');
const Inventory = require('./Inventory');
const Marketing = require('./Marketing');
const SalonsSpots = require('./SalonsSpots');
const TestimonialsReviews = require('./TestimonialsReviews');

// Export all models
const db_async = {
  sequelize,
  Users,
  Admins,
  History,
  Posts,
  Appointments,
  ServicesProducts,
  Plans,
  BillingInvoices,
  Employees,
  Inventory,
  Marketing,
  SalonsSpots,
  TestimonialsReviews,
};

module.exports = db_async;
