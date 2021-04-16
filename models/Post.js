const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  presentedBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Post = mongoose.model("Post",PostSchema);

module.exports = Post

