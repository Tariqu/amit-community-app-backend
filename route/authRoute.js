const { login } = require("../controller/authController");

const router = require("express").Router();

router.route("/login").post(login);

module.exports = router;
