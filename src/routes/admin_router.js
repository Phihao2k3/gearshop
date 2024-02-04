const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const adminController = require("../app/controllers/adminController");
router.use("/product/:delete", adminController.deleteproduct);
router.post(
  "/Product",
  upload.single("product_image"),
  adminController.addproduct
);
router.get("/oders/accept", adminController.accept);
router.get("/oders/detail", adminController.odersdetail);
router.get("/Categories", adminController.categories);
router.use("/Product", adminController.product);
router.use("/oders", adminController.oders);
router.use("/", adminController.index);
module.exports = router;
