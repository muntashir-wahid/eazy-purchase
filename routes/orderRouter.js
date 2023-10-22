const express = require("express");

const { createOrder } = require("./../controllers/orderController");
const { protect } = require("./../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").post(createOrder);

module.exports = router;
