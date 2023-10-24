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
    },
  });

  const productsArr = JSON.parse(JSON.stringify(cart.products));

  const bulkUpdateDoc = productsArr.map((product) => {
    const result = {
      replaceOne: {
        filter: {
          _id: product.item._id.toString(),
        },
        replacement: {
          ...product.item,
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
  await Products.bulkWrite(bulkUpdateDoc);

  const newOrder = await Order.create(order);

  await Cart.findByIdAndDelete(cart.id);

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
