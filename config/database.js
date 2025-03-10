const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config");

const sequelize = new Sequelize(config[env], {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Bypass self-signed certificate error
    },
  },
});

module.exports = sequelize;
