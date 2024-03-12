const Msg = require("../model/mess");

const MessController = {
  getMess: async (req, res) => {
    try {
      const msg = await Msg.find();
      res.status(200).json(msg);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = MessController;
