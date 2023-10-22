const express = require("express");

const {
  createCart,
  deleteCart,
  getCart,
} = require("./../controllers/cartController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router.use(protect, restrictTo("user"));

router.route("/").get(getCart).post(createCart);
router.route("/:id").delete(deleteCart);

module.exports = router;
