const Course = require("../model/course");

const CourseController = {
  getMess: async (req, res) => {
    try {
      const course = await Course.find();
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = CourseController;
