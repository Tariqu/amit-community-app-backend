const admin = require("../db/models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide username and password", 400));
  }

  const result = await admin.findOne({ where: { username } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  const token = generateToken({
    id: result.id,
    userType: "admin",
  });

  return res.json({
    status: "success",
    token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  // 1. get the token from headers
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer asfdasdfhjasdflkkasdf
    idToken = req.headers.authorization.split(" ")[1];
  }
  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }
  // 2. token verification
  const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
  // 3. get the admin detail from db and add to req object
  const freshUser = await admin.findByPk(tokenDetail.id);

  if (!freshUser) {
    return next(new AppError("User no longer exists", 400));
  }
  req.admin = freshUser;
  req.admin.userType = "admin";
  return next();
});

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
    console.log(req.admin.userType, userType);
    if (!userType.includes(req.admin.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    return next();
  };

  return checkPermission;
};

module.exports = { login, authentication, restrictTo };
