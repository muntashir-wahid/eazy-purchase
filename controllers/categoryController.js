const { createOne, getAll, getOne, updateOne } = require("./handlerFactory");
const Category = require("./../models/categoryModel");

// Basic CRUD
exports.createCategory = createOne(Category, "category");
exports.getAllCategories = getAll(Category, "categories");
exports.getCategory = getOne(Category, "category");
exports.updateCategory = updateOne(Category, "category");
