const Cart = require("./../models/cartModel");
const catchAsync = require("./../utils/catchAsync");
const Order = require("./../models/orderModel");
const Products = require("./../models/productModel");

exports.createOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "products",
    populate: {
      path: "item",
      model: "Product",
      select: "name price discount stock",
    },
  });

  const bulkUpdateDoc = cart.products.map((product) => {
    const result = {
      updateOne: {
        filter: {
          _id: product.item._id.toString(),
        },
        update: {
          stock: product.item.stock - product.quantity,
        },
      },
    };

    return result;
  });

  const order = {
    user: cart.user,
    products: [...cart.products],
    orderAmount: cart.products.reduce(
      (accu, curr) =>
        accu + curr.item.price * (1 - curr.item.discount / 100) * curr.quantity,
      0
    ),
  };

  const newOrder = await Order.create(order);

  await Cart.findByIdAndDelete(cart.id);
  await Products.bulkWrite(bulkUpdateDoc);

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
