const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: { type: Date, required: true },
    title: String,
    mood: {
      type: String,
      enum: ["😄", "🙂", "😐", "😔", "😢"],
      default: "😐",
    },
    sentiment: {
      score: Number,
      intensity: {
        type: String,
        enum: ["very positive", "positive", "neutral", "negative", "very negative"],
      },
      comparative: Number,
    },
    content: String,
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    canEdit: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const entryModel = mongoose.model("Entry", entrySchema);

module.exports = entryModel;
