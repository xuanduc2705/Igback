const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const Course = new Schema({
  name: { type: String, minLength: 1, require: true },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  videoid: { type: String, require: true },
  level: { type: String, require: true },
  slug: { type: String, slug: "name", unique: true },
});

module.exports = mongoose.model("Course", Course);
