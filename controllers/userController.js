const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./handlerFactory");
const User = require("./../models/userModel");

exports.getMe = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

exports.createUser = createOne(User, "user");
exports.getAllUsers = getAll(User, "users");
exports.getUser = getOne(User, "user");
exports.updateUser = updateOne(User, "user");
exports.deleteUser = deleteOne(User, "user");
