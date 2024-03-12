const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const msgSchema = new Schema(
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
  { timestamps: true }
);

const Msg = mongoose.model("msg", msgSchema);
module.exports = Msg;
