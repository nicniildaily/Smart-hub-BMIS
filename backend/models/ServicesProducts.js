const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

const ServicesProducts = sequelize.define('services_products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('service', 'product'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = ServicesProducts;
