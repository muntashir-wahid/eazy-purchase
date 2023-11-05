const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./handlerFactory");
const Product = require("./../models/productModel");

const populateOptions = {
  path: "category",
  select: "-__v",
};

exports.popularProducts = (req, res, next) => {
  req.query = { price: { lt: "100" }, limit: "9" };

  next();
};

// Basic CRUD
exports.createProduct = createOne(Product, "product");
exports.getAllProducts = getAll(Product, "products", populateOptions);
exports.getProduct = getOne(Product, "product", populateOptions);
exports.updateProduct = updateOne(Product, "product");
exports.deleteProduct = deleteOne(Product, "product");
