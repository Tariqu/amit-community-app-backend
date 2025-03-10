"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isSubmitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "admin",
        key: "id",
      },
    },
  },
  {
    paranoid: false, // Soft deletes are not enabled
    timestamps: false, // Timestamps are not enabled
    freezeTableName: true,
    modelName: "token",
  }
);

module.exports = token;
