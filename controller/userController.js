const { Sequelize } = require("sequelize");
const crypto = require("crypto");
const user = require("../db/models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const admin = require("../db/models/admin");
const generateSignedUrl = require("../utils/getSignedUrl");
const tokenModel = require("../db/models/token");

const generateLink = catchAsync(async (req, res, next) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry
  const adminId = req.admin.id; // Assuming you have the admin ID in the request

  await tokenModel.create({ token, expiry, adminId });

  const link = `${process.env.CLIENT_URL}/fill-details/${token}`;
  return res.status(200).json({
    status: "success",
    data: { link },
  });
});

const validateToken = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const tokenRecord = await tokenModel.findOne({ where: { token } }); // Assuming you have a model named token
  if (!tokenRecord) {
    return next(new AppError("Invalid token", 400));
  }

  if (tokenRecord.expiry < new Date()) {
    // Assuming expiry is a date field
    return next(new AppError("Token expired", 400));
  }

  if (tokenRecord.isSubmitted) {
    return next(new AppError("Form is already submitted", 400));
  }

  return res.status(200).json({
    status: "success",
    data: {
      valid: true,
      message: "Token is valid",
      adminId: tokenRecord.adminId,
    },
  });
});

const submitDetails = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const tokenRecord = await tokenModel.findOne({ where: { token } });

  if (!tokenRecord) {
    return next(new AppError("Invalid token", 400));
  }

  if (tokenRecord.isSubmitted) {
    return next(new AppError("Form is already submitted", 400));
  }

  if (tokenRecord.expiry < new Date()) {
    return next(new AppError("Token expired", 400));
  }

  const adminId = tokenRecord.adminId;
  const userData = { ...req.body, adminId };

  await user.create(userData);
  await tokenModel.update({ isSubmitted: true }, { where: { token } });

  return res.status(200).json({
    status: "success",
    data: { message: "Details submitted successfully" },
  });
});

// Request signed URL for profile picture upload
const getSignedUrl = catchAsync(async (req, res, next) => {
  const { key, contentType } = req.query;
  if (!key || !contentType) {
    return next(new AppError("Key and content type are required", 400));
  }
  const finalKey = Date.now() + key;
  const signedUrl = generateSignedUrl(finalKey, contentType);
  return res.status(200).json({
    status: "success",
    data: {
      signedUrl,
      publicUrl: `${process.env.PROFILE_IMAGE_BASE_URL}/${finalKey}`,
    },
  });
});

// Get all users with filtering
const getAllUsers = catchAsync(async (req, res, next) => {
  const { search, page = 1, limit = 10, ...filters } = req.query;
  const where = {};

  if (search) {
    where[Sequelize.Op.or] = [
      { firstName: { [Sequelize.Op.like]: `%${search}%` } },
      { lastName: { [Sequelize.Op.like]: `%${search}%` } },
      { email: { [Sequelize.Op.like]: `%${search}%` } },
      // Add other fields as needed
    ];
  }

  // Add filters to the where clause
  Object.keys(filters).forEach((key) => {
    where[key] = filters[key];
  });

  const offset = (page - 1) * limit;

  const users = await user.findAndCountAll({
    where,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
    include: [
      {
        model: admin,
        attributes: ["id", "username", "firstName", "lastName"],
        as: "admin",
      },
    ],
  });

  return res.status(200).json({
    status: "success",
    data: users,
  });
});

// Add a new user
const addUser = catchAsync(async (req, res, next) => {
  const adminId = req.admin.id;
  const newUser = await user.create({ ...req.body, adminId });
  return res.status(201).json({
    status: "success",
    data: newUser,
  });
});

// Update a user
const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await user.update(req.body, {
    where: { id },
    returning: true, // Return the updated user
    plain: true, // Return the plain object instead of an array
  });

  if (!updatedUser[1]) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: updatedUser[1],
  });
});

// Delete a user
const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await user.destroy({
    where: { id },
  });

  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getSignedUrl,
  generateLink,
  submitDetails,
  validateToken,
};
