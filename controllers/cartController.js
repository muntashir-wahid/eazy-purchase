const Cart = require("./../models/cartModel");
const catchAsync = require("./../utils/catchAsync");

exports.createCart = catchAsync(async (req, res, next) => {
  const currentUserCart = await Cart.findOne({ user: req.user.id });

  let cart = {
    user: req.user.id,
    products: [{ item: req.body.product, quantity: req.body.quantity }],
  };
  let newCart;

  if (currentUserCart) {
    cart = currentUserCart.addProductToCart(req.body);
    await Cart.findByIdAndDelete(currentUserCart.id);
  }

  newCart = await Cart.create(cart);

  res.status(201).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  res.status(200).json({
    status: "success",
    data: {
      cart: cart,
    },
  });
});

// exports.getAllCartProducts = ()
