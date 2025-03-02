const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert("admin", [
      {
        username: "admin",
        password: hashPassword,
        firstName: "Admin",
        lastName: "User",
        email: process.env.ADMIN_EMAIL,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admin", { username: "admin" }, {});
  },
};
