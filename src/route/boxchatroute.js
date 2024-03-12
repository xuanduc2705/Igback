const BoxchatController = require("../controller/BoxchatController");

const router = require("express").Router();
router.get("/", BoxchatController.getBoxchat);

module.exports = router;
