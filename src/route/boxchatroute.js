const BoxchatController = require("../controller/BoxchatController");

const router = require("express").Router();
router.get("/", BoxchatController.getBoxchat);
router.post("/", BoxchatController.addBoxchat);
module.exports = router;
