const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
const Users = require('./Users');

const BillingInvoices = sequelize.define('billing_invoices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  billing_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

BillingInvoices.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Users.hasMany(BillingInvoices, { foreignKey: 'user_id', as: 'billing_invoices' });

module.exports = BillingInvoices;
