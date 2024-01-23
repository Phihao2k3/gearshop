const express = require('express');
const router = express.Router();
const adminController = require("../app/controllers/adminController");
router.use("/oders/:id", adminController.odersdetail);
router.use("/oders", adminController.oders);
router.get("/Categories", adminController.categories);
router.use("/Product", adminController.product);
router.use("/", adminController.index);
module.exports = router;