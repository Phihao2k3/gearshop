const express = require("express");
const router = express.Router();
const checkoutController = require("../app/controllers/checkout");
// tạo ra các route cho login
router.use("/checkout/thankyou", checkoutController.thankyou);
router.post("/checkout", checkoutController.checkout);
router.use("/", checkoutController.index);
// set account

module.exports = router;
