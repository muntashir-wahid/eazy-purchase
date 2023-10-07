const catchAsync = require("../util/catchAsync");
const Category = require("./../models/categoryModel");

exports.createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});
