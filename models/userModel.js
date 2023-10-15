const bcrypt = require("bcryptjs");
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
    select: false,
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
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  photo: String,
  status: {
    type: String,
    default: "active",
    enum: {
      values: ["active", "suspended"],
      message: "Provide a valid status",
    },
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  // Exit the function if document is not modified or newly created
  if (!this.isModified("password")) next();

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;

  next();
});

userSchema.post("save", function (doc) {
  doc.password = undefined;
  doc.role = undefined;
  doc.status = undefined;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
