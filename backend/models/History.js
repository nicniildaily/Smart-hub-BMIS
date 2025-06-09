const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
/* const Products = require("./Products"); */
const Users = require("./Users");

/**
 * Table history
 *@author 
 *@date 21/11/2023
 */
const History = sequelize.define(
    "history",
    {
        id_history: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue:null
        },
        id_product: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            defaultValue:null
        },
        id_users: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            defaultValue:null
        },
        admin_id: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            defaultValue:null
        },
        id_type_wallet: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        }  
    },
    {
        freezeTableName: true,
        tableName: "history",
        timestamps: false,
    }
);
/* History.belongsTo(Products, { foreignKey: "id_product", as: 'product' }) */
/* History.belongsTo(Wallet_type, { foreignKey: "id_type_wallet", as: 'typewallet' }) */
History.belongsTo(Users, { foreignKey: "admin_id", as: "merchant" })
Users.hasMany(History, { as: 'history', foreignKey: "id_users" })

module.exports = History;
