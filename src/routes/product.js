const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/productController");

router.use("/:sanphamchitiet/:addcart", productController.addcart);
router.use("/:sanphamchitiet", productController.showdetail);
router.use("/", productController.showall);
module.exports = router;
