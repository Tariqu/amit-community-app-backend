"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("admin", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: {
            msg: "Invalid email id",
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("admin");
  },
};
