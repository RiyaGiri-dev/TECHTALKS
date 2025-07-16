const mongoose = require("mongoose");

const vlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vlog", vlogSchema);
