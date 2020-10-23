const mongoose = require("mongoose");
const bcryptPlugin = require("../utils/bcryptHash");
const Schema = mongoose.Schema;
const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "normal",
      enum: ["admin", "normal"],
    },
    ctime: {
      type: String,
      default: Date.now,
    },
  },
  { collection: "users" }
);
usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("users", usersSchema);
