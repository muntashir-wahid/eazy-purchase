const AppError = require("./../utils/appError");
const Cart = require("./../models/cartModel");
const { deleteOne } = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const Product = require("./../models/productModel");

exports.createCart = catchAsync(async (req, res, next) => {
  const currentUserCart = await Cart.findOne({ user: req.user.id });
  const isProductAvailable = await Product.findOne({
    _id: req.body.product,
    status: "published",
  });

  // Check if the product is available
  if (!isProductAvailable) {
    return next(new AppError("Can't find any product!", 400));
  }

  let cart = {
    user: req.user.id,
    products: [{ item: req.body.product, quantity: req.body.quantity }],
  };
  let newCart;

  if (currentUserCart) {
    // If the user has a cart then add new item to the cart
    currentUserCart.addProductToCart(req.body);
    newCart = await currentUserCart.save();
  } else {
    // Crate a new cart
    newCart = await Cart.create(cart);
  }

  res.status(201).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "products",
    populate: {
      path: "item",
      model: "Product",
      select: "name price discount discountPrice",
    },
  });

  // If the user has no cart
  if (!cart) {
    return res.status(204).json({
      status: "success",
      data: {
        cart: null,
      },
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      cart: cart,
    },
  });
});

exports.deleteCart = deleteOne(Cart, "cart");
