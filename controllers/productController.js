const Product = require("./../models/productModel");

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
