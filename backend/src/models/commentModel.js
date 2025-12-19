const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    entryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Entry",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
