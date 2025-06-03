const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

const Inventory = sequelize.define('inventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Inventory;
