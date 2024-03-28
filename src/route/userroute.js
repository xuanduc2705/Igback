const UserController = require("../controller/UserController");

const router = require("express").Router();
router.get("/", UserController.getUser);
router.post("/", UserController.Register);
router.post("/login", UserController.login);
module.exports = router;
