const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

const Employees = sequelize.define('employees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Employees;
