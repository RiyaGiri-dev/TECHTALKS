const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  vlogId: { type: mongoose.Schema.Types.ObjectId, ref: "Vlog" },
  username: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
