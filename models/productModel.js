const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A product must have a name"],
      minLength: [3, "A product name should be more or equal 3 characters"],
      maxLength: [40, "A product name should be less or equal 40 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must a price"],
      min: [10, "Price should be more or equal 10"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "published",
      enum: {
        values: ["published", "unpublished", "damaged", "stockOut"],
        message: "Expected status: published, unpublished, damaged, stockOut",
      },
    },
    brand: String,
    image: String,
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4,
    },
    reviews: {
      type: Number,
      default: 0,
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

productSchema.virtual("discountedPrice").get(function () {
  const discount = (this.price * this.discount) / 100;
  return this.price - discount;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;