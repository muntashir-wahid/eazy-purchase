const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
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
    orderAmount: {
      type: Number,
      min: [1, "Order amount must be greater or equal 1"],
      required: [true, "Order must have a total order amount"],
    },
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

// orderSchema.post("save", function() {

// })

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
