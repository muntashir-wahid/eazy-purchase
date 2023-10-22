const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
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

cartSchema.methods.addProductToCart = function (newProduct) {
  // Find the existing product's index
  const alreadyAddedProductIndex = this.products.findIndex(
    (product) => product.item.toString() === newProduct.product
  );

  if (alreadyAddedProductIndex !== -1) {
    // If existing products quantity reached to 0
    if (+newProduct.quantity === 0) {
      this.products = this.products.filter(
        (product) => product.item.toString() !== newProduct.product
      );

      return;
    }

    // Increment the products quantity
    this.products[alreadyAddedProductIndex].quantity = newProduct.quantity;
  } else {
    // Add the new product into the cart

    this.products.push({
      item: newProduct.product,
      quantity: newProduct.quantity,
    });
  }
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
