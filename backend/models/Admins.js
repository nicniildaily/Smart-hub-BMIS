const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");

/**
 * Table admins
 *@author Vanny AZOSENGA
 *@author Nestor Kariuki
 *@date 21/11/2023
 */
const Admins = sequelize.define(
    "admins",
    {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT(),
            allowNull: true,
            defaultValue:null
        },
        adress: {
            type: DataTypes.TEXT(),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        pin: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sector_id: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            defaultValue:null
        },
        hashed_pin: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue:null
        },
        remember_me: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue:null
        } 
    },
    {
        freezeTableName: true,
        tableName: "admins",
        timestamps: false,
    }
);


module.exports = Admins;
