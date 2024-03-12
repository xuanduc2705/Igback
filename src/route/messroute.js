const messcontroller = require("../controller/messcontroller");

const router = require("express").Router();
router.get("/", messcontroller.getMess);

module.exports = router;
