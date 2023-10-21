const express = require("express");

const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("./../controllers/userController");
const { login, signup } = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
