const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const User = new Schema({
  email: { type: String, minLength: 1, require: true },
  password: { type: String, minLength: 6 },
  name: { type: String, maxLength: 255 },
  nickname: { type: String, require: true },
  avatar: { type: String, require: true },
});

module.exports = mongoose.model("User", User);
