const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    products: [
      {
        item: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          min: [1, "Cart item should be more or equal 1"],
          default: 1,
        },
        _id: false,
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    populate: {
      path: "item",
      model: "Product",
      select: "name price discount discountPrice",
    },
  });

  next();
});

cartSchema.methods.addProductToCart = function (newProduct) {
  console.log("Cart Items", this, newProduct);

  // let updatedCart;

  // const updatedItems = this.products.push({
  //   item: newProduct.product,
  //   quantity: newProduct.quantity,
  // });

  const updatedCart = {
    user: this.user._id.toString(),
    products: [
      ...this.products,
      { item: newProduct.product, quantity: newProduct.quantity },
    ],
  };

  return updatedCart;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
