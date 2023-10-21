const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} = require("./../controllers/categoryController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(protect, restrictTo("admin"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(protect, restrictTo("admin"), updateCategory);

module.exports = router;
