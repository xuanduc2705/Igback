const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boxchatSchema = new Schema(
  {
    boxchatid: {
      type: String,
      required: true,
    },
    isGroupchat: {
      type: Boolean,
      require: true,
    },
    host: {
      type: String,
      require: true,
    },
    avatar1: {
      type: String,
    },
    avatar2: {
      type: String,
    },
    groupava: {
      type: String,
    },
    groupname: {
      type: String,
    },
    member: [],
    msgg: [
      {
        content: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
      },
    ],
  },
  { timestamps: false }
);

const Boxchat = mongoose.model("Boxchat", boxchatSchema);
module.exports = Boxchat;
