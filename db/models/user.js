"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const user = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    fathersName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "fathersName cannot be null",
        },
        notEmpty: {
          msg: "fathersName cannot be empty",
        },
      },
    },
    mothersName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "mothersName cannot be null",
        },
        notEmpty: {
          msg: "mothersName cannot be empty",
        },
      },
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "origin cannot be null",
        },
        notEmpty: {
          msg: "origin cannot be empty",
        },
      },
    },
    gotr: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "gotr cannot be null",
        },
        notEmpty: {
          msg: "gotr cannot be empty",
        },
      },
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "occupation cannot be null",
        },
        notEmpty: {
          msg: "occupation cannot be empty",
        },
      },
    },
    occupationDetail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "occupationDetail cannot be null",
        },
        notEmpty: {
          msg: "occupationDetail cannot be empty",
        },
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "dob cannot be null",
        },
        notEmpty: {
          msg: "dob cannot be empty",
        },
        isDate: {
          msg: "Invalid date format",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\+?[\d\s-]+$/,
          msg: "Phone number must contain only digits, spaces, or hyphens, and may start with '+'.",
        },
      },
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "area cannot be null",
        },
        notEmpty: {
          msg: "area cannot be empty",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "city cannot be null",
        },
        notEmpty: {
          msg: "city cannot be empty",
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "state cannot be null",
        },
        notEmpty: {
          msg: "state cannot be empty",
        },
      },
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "pinCode cannot be null",
        },
        notEmpty: {
          msg: "pinCode cannot be empty",
        },
        isNumeric: {
          msg: "Invalid PIN code",
        },
      },
    },
    otherDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "admin",
        key: "id",
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
    modelName: "user",
  }
);

// Define associations

module.exports = user;
