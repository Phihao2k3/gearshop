const express = require("express");
const router = express.Router();
const sitecontroller = require("../app/controllers/sitecontroller");
// tạo ra các route cho site

router.use("/search", sitecontroller.search);
router.use("/", sitecontroller.home);
module.exports = router;
