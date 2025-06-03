const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()
const sequelize = new Sequelize({
          host: process.env.DB_HOST,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT ? process.env.DB_PORT :3306,
          dialect: 'mysql'
})

module.exports = sequelize
