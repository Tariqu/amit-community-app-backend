"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const user = require("./user");
const token = require("./token");

const admin = sequelize.define(
  "admin",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "username cannot be null",
        },
        notEmpty: {
          msg: "username cannot be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstName cannot be null",
        },
        notEmpty: {
          msg: "firstName cannot be empty",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastName cannot be null",
        },
        notEmpty: {
          msg: "lastName cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "Invalid email id",
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "admin",
  }
);

// Define associations
admin.hasMany(user, { foreignKey: "adminId", as: "users" });
user.belongsTo(admin, { foreignKey: "adminId", as: "admin" });
admin.hasMany(token, { foreignKey: "adminId", as: "tokens" });
token.belongsTo(admin, { foreignKey: "adminId", as: "admin" });

module.exports = admin;
