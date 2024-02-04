const express = require("express");
const router = express.Router();
const cartController = require("../app/controllers/cartcontroller");
// tạo ra các route cho login
router.use("/delete", cartController.deletecart); // addcart
router.use("/:addcarrt", cartController.addcart); // addcart
router.use("/", cartController.index); // index
// set account

module.exports = router;
