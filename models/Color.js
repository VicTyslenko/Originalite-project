const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    hash: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Color = mongoose.model("colors", ColorSchema);
