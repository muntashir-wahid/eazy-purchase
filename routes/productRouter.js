const express = require("express");

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} = require("./../controllers/productController");

const { protect } = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
