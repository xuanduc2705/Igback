const User = require("../model/user");
const bcrypt = require("bcrypt");
const UserController = {
  getUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = UserController;
