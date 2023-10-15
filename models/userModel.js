const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "An user must have an email"],
    unique: [true, "Email must be unique"],
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not an valid email`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be more or equal 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password Confirm is required"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: () => "Passwords are not same.",
    },
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin"],
      message: "Provide a valid user type",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
