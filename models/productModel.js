const mongoose = require("mongoose");

const Category = require("./categoryModel");

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
      min: [0, "Discount should be more or equal 0"],
      max: [99, "Discount should be less or equal 99"],
    },
    status: {
      type: String,
      default: "published",
      enum: {
        values: ["published", "unpublished"],
        message: "Expected status: published, unpublished",
      },
      get: function () {
        return this.stock > 0 ? "published" : "unpublished";
      },
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: [true, "A product must have a valid category id"],
      validate: {
        validator: async function () {
          const hasCategory = await Category.findById(this.category.toString());

          return !!hasCategory;
        },

        message: "Provide a valid category id",
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
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);

productSchema.virtual("discountedPrice").get(function () {
  const discount = (this.price * this.discount) / 100;
  return this.price - discount;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
