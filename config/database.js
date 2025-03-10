const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config");
console.log("config : ", config[env]);
const sequelize = new Sequelize(config[env], {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Bypass self-signed certificate error
    },
  },
  logging: console.log,
});

module.exports = sequelize;
