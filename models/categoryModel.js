const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have a name"],
    trim: true,
    unique: true,
  },
  slug: String,
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });

  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
