const { authentication, restrictTo } = require("../controller/authController");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = require("express").Router();

router
  .route("/")
  .get(authentication, restrictTo("admin"), getAllUsers) // Admin can see list of users
  .post(authentication, restrictTo("admin"), addUser); // Admin can add a new user

router
  .route("/:id")
  .patch(authentication, restrictTo("admin"), updateUser) // Admin can update a user
  .delete(authentication, restrictTo("admin"), deleteUser); // Admin can delete a user

module.exports = router;
