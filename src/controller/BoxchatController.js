const Boxchat = require("../model/boxchat");
const BoxchatController = {
  getBoxchat: async (req, res) => {
    try {
      const boxchat = await Boxchat.find();
      res.status(200).json(boxchat);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = BoxchatController;
