const { createOne, getAll, getOne, updateOne } = require("./handlerFactory");
const Category = require("./../models/categoryModel");

// Basic CRUD
exports.createCategory = createOne(Category, "categories");
exports.getAllCategories = getAll(Category, "category");
exports.getCategory = getOne(Category, "category");
exports.updateCategory = updateOne(Category, "category");
