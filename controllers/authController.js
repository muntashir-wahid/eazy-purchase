const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

exports.signup = catchAsync(async (req, res, nex) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = "Fake token";

  res.status(201).json({
    status: "success",
    data: {
      token,
      user: newUser,
    },
  });
});
