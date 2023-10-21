const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

// Creates a new JWT
const signToken = (id) => {
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

  const token = signToken(newUser.id);

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
  const token = signToken(user.id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if the token is there and save the token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Get the user and check if he still exists
  const currentUser = await User.findById(decoded.id).select("+role");
  if (!currentUser) {
    return next(
      new AppError("The user belongs to the token does no longer exist")
    );
  }

  // Set the user on the request object
  req.user = currentUser;

  // Grant access to a protected route
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    // User is authorized and grand permission to the resource
    next();
  };
};
