const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

const Marketing = sequelize.define('marketing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  campaign_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Marketing;
