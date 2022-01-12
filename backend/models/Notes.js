const mongoose = require("mongoose");

//Creation of schema ( FORMAT OF PARTICULAR THING )

const NotesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", NotesSchema);
