const generateRandomNumber = require("../function");
const Boxchat = require("../model/boxchat");
const jwt = require("jsonwebtoken");
const BoxchatController = {
  getBoxchat: async (req, res) => {
    try {
      const boxchat = await Boxchat.find();
      res.status(200).json(boxchat);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addBoxchat: async (req, res) => {
    try {
      const { host, partner, isg, avatar1, avatar2, groupname } = req.body;

      // Generate a random boxchatid
      const boxchatid = generateRandomNumber;
      let boxchat;
      if (isg == true) {
        const existingBoxchat = await Boxchat.findOne({
          member: partner,
          host: host,
          groupname: groupname,
        });
        if (existingBoxchat) {
          return res.status(400).json({ error: "Already has" });
        }
        boxchat = new Boxchat({
          boxchatid,
          isGroupchat: isg,
          host,
          member: partner,
          groupava: "",
          msgg: [],
          groupname: groupname,
        });
      } else {
        const existingBoxchat1 = await Boxchat.findOne({
          member: partner,
          host: host,
        });
        const existingBoxchat2 = await Boxchat.findOne({
          member: host,
          host: partner,
        });
        if (existingBoxchat1 || existingBoxchat2) {
          return res.status(400).json({ error: "Already has" });
        }
        boxchat = new Boxchat({
          boxchatid,
          isGroupchat: isg,
          host,
          member: partner,
          avatar1: avatar1,
          avatar2: avatar2,
          msgg: [],
        });
      }
      // Save the new Boxchat object to the database
      await boxchat.save();

      res.status(200).json(boxchat);
    } catch (err) {
      res.status(500).json({ error: "Failed to add boxchat" });
    }
  },
};

module.exports = BoxchatController;
