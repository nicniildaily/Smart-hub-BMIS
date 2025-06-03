const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");

/**
 * Table admins
 *@author Nestor Kariuki
 *@date 5/01/2025
 */
const Posts = sequelize.define(
    "posts",
    {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT(),
            allowNull: true,
            defaultValue:null
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT(),
            allowNull: false,
            defaultValue:0
        },
        product_description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sector_id: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            defaultValue:null
        },
    },
    {
        freezeTableName: true,
        tableName: "Posts",
        timestamps: false,
    }
);


module.exports = Posts;
