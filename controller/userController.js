const { Sequelize } = require("sequelize");
const user = require("../db/models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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
  });

  return res.status(200).json({
    status: "success",
    data: users,
  });
});

// Add a new user
const addUser = catchAsync(async (req, res, next) => {
  const newUser = await user.create(req.body);
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
    returning: true,
    plain: true,
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

module.exports = { getAllUsers, addUser, updateUser, deleteUser };
