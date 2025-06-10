const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");

/**
 * Table device_tokens
 * Stores device push tokens for users
 */
const DeviceTokens = sequelize.define(
    "device_tokens",
    {
        id_device_token: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_users: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        freezeTableName: true,
        tableName: "device_tokens",
        timestamps: false,
    }
);

module.exports = DeviceTokens;
