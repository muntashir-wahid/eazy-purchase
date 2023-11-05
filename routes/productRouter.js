const express = require("express");

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  popularProducts,
  updateProduct,
} = require("./../controllers/productController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router.get("/popular-products", popularProducts, getAllProducts);

router
  .route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("admin"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

module.exports = router;
