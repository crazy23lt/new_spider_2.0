const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    context: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    url: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    ctime: {
      type: Number,
      default: Date.now,
    },
  },
  { collection: "news" }
);

module.exports = mongoose.model("news", newsSchema);
