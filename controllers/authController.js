const jwt = require("jsonwebtoken");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

// Creates a new JWT
const signToken = ({ id }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    data: {
      token,
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // Guard clause to check if both email and password is available
  if (!req.body.email || !req.body.password) {
    next(new AppError("Please provide email and password", 400));
  }

  // Get the user
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // Check if the user exits and password is correct
  if (!user || !(await user.checkPasswordIsCorrect(req.body.password))) {
    return next(new AppError("No user found with given credentials", 401));
  }

  // Create a new token
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});
