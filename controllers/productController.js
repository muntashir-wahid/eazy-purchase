const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./handlerFactory");
const Product = require("./../models/productModel");

// Basic CRUD
exports.createProduct = createOne(Product, "product");
exports.getAllProducts = getAll(Product, "products");
exports.getProduct = getOne(Product, "product");
exports.updateProduct = updateOne(Product, "product");
exports.deleteProduct = deleteOne(Product, "product");
