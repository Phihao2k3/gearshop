const express = require("express");
const router = express.Router();
const loginController = require("../app/controllers/loginController");
// tạo ra các route cho login 
router.post("/", loginController.login);
router.use("/:forgot", loginController.show)
router.get("/", loginController.index);
// set account

module.exports = router;