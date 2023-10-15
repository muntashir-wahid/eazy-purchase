const jwt = require("jsonwebtoken");

const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

// Creates a new JWT
const signToken = ({ id }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.signup = catchAsync(async (req, res, nex) => {
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
