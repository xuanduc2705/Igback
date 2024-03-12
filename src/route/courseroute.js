const CourseController = require("../controller/CourseController");

const router = require("express").Router();
router.get("/", CourseController.getMess);

module.exports = router;
