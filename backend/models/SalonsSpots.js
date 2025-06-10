const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

const SalonsSpots = sequelize.define('salons_spots', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = SalonsSpots;
