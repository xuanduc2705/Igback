const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserController = {
  getUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  Register: async (req, res) => {
    try {
      const { email, nickname, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newuser = await new User({
        email: email,
        nickname: nickname,
        name: nickname,
        password: hashed,
        avatar: "",
      });
      const user = await newuser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(404).json({ message: "Incorrect password" });
      }
      if (user && validPass) {
        const accesstoken = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ user, accesstoken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = UserController;
