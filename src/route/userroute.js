const UserController = require("../controller/UserController");

const router = require("express").Router();
router.get("/", UserController.getUser);
module.exports = router;
