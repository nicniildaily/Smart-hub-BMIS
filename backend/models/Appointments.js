const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
const Users = require('./Users');

const Appointments = sequelize.define('appointments', {
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
  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  appointment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  appointment_time: {
    type: DataTypes.TIME,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

Appointments.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Users.hasMany(Appointments, { foreignKey: 'user_id', as: 'appointments' });

module.exports = Appointments;
