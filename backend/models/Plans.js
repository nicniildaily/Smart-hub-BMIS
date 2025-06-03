const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

const Plans = sequelize.define('plans', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plan_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  appointment_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Plans;
