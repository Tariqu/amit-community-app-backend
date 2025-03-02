"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      fathersName: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.DATE,
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^\+?[\d\s-]+$/,
            msg: "Phone number must contain only digits, spaces, or hyphens, and may start with '+'.",
          },
        },
      },
      area: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.TEXT,
        allowNull: true,
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
      adminId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "admin",
          key: "id",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
