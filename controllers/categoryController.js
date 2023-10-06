const Category = require("./../models/categoryModel");

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
};

exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
};

// exports.updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       product,
//     },
//   });
// };

// exports.deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);

//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// };
