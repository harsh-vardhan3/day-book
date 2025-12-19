const Entry = require("../models/entryModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

// Share entry with a user
const shareEntry = async (req, res) => {
  const { entryId, email, canEdit } = req.body;
  const loggedUser = req.user;

  try {
    // Check if entry belongs to logged user
    const entry = await Entry.findOne({
      _id: entryId,
      createdBy: loggedUser._id,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or you don't have permission to share it",
      });
    }

    // Find user by email
    const userToShare = await User.findOne({ email: email.toLowerCase() });
    if (!userToShare) {
      return res.status(404).json({ message: "User with this email not found" });
    }

    // Check if trying to share with self
    if (userToShare._id.toString() === loggedUser._id.toString()) {
      return res.status(400).json({ message: "Cannot share with yourself" });
    }

    // Check if already shared
    if (entry.sharedWith.some(id => id.toString() === userToShare._id.toString())) {
      return res
        .status(400)
        .json({ message: "Entry already shared with this user" });
    }

    entry.sharedWith.push(userToShare._id);
    
    // Add edit permission if requested
    if (canEdit) {
      entry.canEdit = entry.canEdit || [];
      entry.canEdit.push(userToShare._id);
    }
    
    await entry.save();

    res.status(200).json({
      message: "Entry shared successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Error sharing entry:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// Unshare entry with a user
const unshareEntry = async (req, res) => {
  const { entryId, userId } = req.body;
  const loggedUser = req.user;

  try {
    const entry = await Entry.findOne({
      _id: entryId,
      createdBy: loggedUser._id,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or you don't have permission to unshare it",
      });
    }

    entry.sharedWith = entry.sharedWith.filter((id) => id.toString() !== userId);
    await entry.save();

    res.status(200).json({
      message: "Entry unshared successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Error unsharing entry:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// Get entries shared with me
const getSharedWithMe = async (req, res) => {
  const loggedUser = req.user;

  try {
    const entries = await Entry.find({
      sharedWith: loggedUser._id,
    })
      .populate("createdBy", "firstName lastName email")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Shared entries fetched successfully",
      data: entries,
    });
  } catch (error) {
    console.error("Error fetching shared entries:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// Add comment to entry
const addComment = async (req, res) => {
  const { entryId, content } = req.body;
  const loggedUser = req.user;

  if (!content || content.trim().length === 0) {
    return res.status(422).json({ message: "Comment cannot be empty" });
  }

  if (content.length > 500) {
    return res
      .status(422)
      .json({ message: "Comment must be less than 500 characters" });
  }

  try {
    // Check if user can comment (owner or shared with them)
    const entry = await Entry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const isOwner = entry.createdBy.toString() === loggedUser._id.toString();
    const isShared = entry.sharedWith.includes(loggedUser._id);

    if (!isOwner && !isShared) {
      return res
        .status(403)
        .json({ message: "You don't have permission to comment on this entry" });
    }

    const comment = await Comment.create({
      entryId,
      author: loggedUser._id,
      content,
    });

    const populatedComment = await comment.populate(
      "author",
      "firstName lastName"
    );

    res.status(201).json({
      message: "Comment added successfully",
      data: populatedComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// Get comments for entry
const getComments = async (req, res) => {
  const { entryId } = req.params;
  const loggedUser = req.user;

  try {
    const entry = await Entry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const isOwner = entry.createdBy.toString() === loggedUser._id.toString();
    const isShared = entry.sharedWith.includes(loggedUser._id);

    if (!isOwner && !isShared) {
      return res
        .status(403)
        .json({ message: "You don't have permission to view comments" });
    }

    const comments = await Comment.find({ entryId })
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const loggedUser = req.user;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== loggedUser._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

module.exports = {
  shareEntry,
  unshareEntry,
  getSharedWithMe,
  addComment,
  getComments,
  deleteComment,
};
