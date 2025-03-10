const { authentication, restrictTo } = require("../controller/authController");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getSignedUrl,
  generateLink,
  validateToken,
  submitDetails,
} = require("../controller/userController");

const router = require("express").Router();

router
  .route("/signed-url")
  .get(authentication, restrictTo("admin"), getSignedUrl);

router
  .route("/generate-link")
  .get(authentication, restrictTo("admin"), generateLink);
router.route("/validate-token/:token").get(validateToken);
router.route("/submit-details/:token").post(submitDetails);

router
  .route("/")
  .get(authentication, restrictTo("admin"), getAllUsers) // Admin can see list of users
  .post(authentication, restrictTo("admin"), addUser); // Admin can add a new user

router
  .route("/:id")
  .patch(authentication, restrictTo("admin"), updateUser) // Admin can update a user
  .delete(authentication, restrictTo("admin"), deleteUser); // Admin can delete a user

module.exports = router;
