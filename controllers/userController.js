const { createOne, getAll } = require("./handlerFactory");
const User = require("./../models/userModel");

exports.createUser = createOne(User, "user");
exports.getAllUsers = getAll(User, "users");
