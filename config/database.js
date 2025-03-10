const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config");
console.log("config : ", config[env]);
const sequelize = new Sequelize(
  "postgres://amit_123:Tarique99471@amit-community-pg-db.c36uuosi88ze.ap-south-1.rds.amazonaws.com:5432/community",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log, // Optional: Logs SQL queries to help debug
  }
);

module.exports = sequelize;
