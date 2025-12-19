const Entry = require("../models/entryModel");
const User = require("../models/userModel");
const validator = require("validator");
const analyzeSentiment = require("../utils/sentimentAnalyzer");

// Helper function to calculate streak
const updateUserStreak = async (userId, entryDate) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const today = new Date(entryDate);
    today.setHours(0, 0, 0, 0);

    if (!user.lastEntryDate) {
      // First entry ever
      user.currentStreak = 1;
      user.longestStreak = 1;
      user.lastEntryDate = today;
    } else {
      const lastEntry = new Date(user.lastEntryDate);
      lastEntry.setHours(0, 0, 0, 0);
      
      const diffTime = today - lastEntry;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Same day, don't update streak
        return;
      } else if (diffDays === 1) {
        // Consecutive day, increment streak
        user.currentStreak += 1;
        if (user.currentStreak > user.longestStreak) {
          user.longestStreak = user.currentStreak;
        }
        user.lastEntryDate = today;
      } else {
        // Streak broken, reset to 1
        user.currentStreak = 1;
        user.lastEntryDate = today;
      }
    }

    await user.save();
  } catch (error) {
    console.error("Error updating streak:", error);
  }
};

const createEntry = async (req, res) => {
  const { date, mood, title, content } = req.body;
  const loggedUser = req.user;

  if (!title || !content)
    return res
      .status(422)
      .json({ message: "Please submit with required fields!" });

  if (!validator.isDate(date)) {
    return res.status(422).json({
      message: "Please provide a valid date!",
    });
  }

  if (title.length > 20) {
    return res.status(422).json({
      message: "Title length should not be more than 20 characters!",
    });
  }

  if (content.length > 10000) {
    return res.status(422).json({
      message: "Content length should not be more than 10,000 characters",
    });
  }

  try {
    // Analyze sentiment from content
    const sentimentAnalysis = analyzeSentiment(title + " " + content);

    const saveEntry = await Entry.create({
      createdBy: loggedUser._id,
      date,
      title,
      mood: sentimentAnalysis.mood, // Auto-set mood from sentiment
      sentiment: {
        score: sentimentAnalysis.score,
        intensity: sentimentAnalysis.intensity,
        comparative: sentimentAnalysis.comparative,
      },
      content,
    });

    // Update user's writing streak
    await updateUserStreak(loggedUser._id, date);

    res.status(201).json({
      message: "Entry added successfully!",
      saveEntry,
    });
  } catch (error) {
    console.error("Error adding entry!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const getEntries = async (req, res) => {
  const loggedUser = req.user;

  try {
    const entries = await Entry.find({ createdBy: loggedUser._id })
      .populate("createdBy", "firstName lastName")
      .sort({ date: -1 });

    res
      .status(200)
      .json({ message: "Entries fetched successfully!", data: entries });
  } catch (error) {
    console.error("Error fetching entries!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const getEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findById(entryId)
      .populate("createdBy", "firstName lastName");

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found!",
      });
    }

    // Check if user is owner or entry is shared with them
    const isOwner = entry.createdBy._id.toString() === loggedUser._id.toString();
    const isShared = entry.sharedWith && entry.sharedWith.some(
      id => id.toString() === loggedUser._id.toString()
    );

    if (!isOwner && !isShared) {
      return res.status(403).json({
        message: "You don't have permission to view this entry!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry fetched successfully!", data: entry });
  } catch (error) {
    console.error("Error fetching this entry!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const updateEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;
  const { date, title, mood, content } = req.body;

  if (!title || !content)
    return res
      .status(422)
      .json({ message: "Please submit with required fields!" });

  if (!validator.isDate(date)) {
    return res.status(422).json({
      message: "Please provide a valid date!",
    });
  }

  if (title.length > 20) {
    return res.status(422).json({
      message: "Title length should not be more than 20 characters!",
    });
  }

  if (content.length > 1500) {
    return res.status(422).json({
      message: "Content length should not be more than 1500 characters",
    });
  }

  try {
    // Analyze sentiment from content
    const sentimentAnalysis = analyzeSentiment(title + " " + content);

    // Find entry first to check permissions
    const existingEntry = await Entry.findById(entryId);
    
    if (!existingEntry) {
      return res.status(404).json({
        message: "Entry not found!",
      });
    }

    // Check if user is owner or has edit permission
    const isOwner = existingEntry.createdBy.toString() === loggedUser._id.toString();
    const canEdit = existingEntry.canEdit && existingEntry.canEdit.some(
      id => id.toString() === loggedUser._id.toString()
    );

    if (!isOwner && !canEdit) {
      return res.status(403).json({
        message: "You don't have permission to edit this entry!",
      });
    }

    const entry = await Entry.findByIdAndUpdate(
      entryId,
      {
        date,
        title,
        mood: sentimentAnalysis.mood, // Auto-update mood from sentiment
        sentiment: {
          score: sentimentAnalysis.score,
          intensity: sentimentAnalysis.intensity,
          comparative: sentimentAnalysis.comparative,
        },
        content,
      },
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or not updated due to permissions!",
      });
    }

    // Emit Socket.io event for real-time updates
    const io = req.app.get("io");
    if (io) {
      io.emit("entry-updated", {
        entryId: entry._id,
        updatedBy: loggedUser._id,
        entry: entry,
      });
    }

    res
      .status(200)
      .json({ message: "Entry updated successfully!", data: entry });
  } catch (error) {
    console.error("Error updating this entry!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const deleteEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findOneAndDelete({
      _id: entryId,
      createdBy: loggedUser._id,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or not deleted due to permissions!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry deleted successfully!", data: entry });
  } catch (error) {
    console.error("Error deleting this entry!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const toggleFavorite = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findOne({
      _id: entryId,
      createdBy: loggedUser._id,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found!",
      });
    }

    entry.isFavorite = !entry.isFavorite;
    await entry.save();

    res.status(200).json({
      message: entry.isFavorite
        ? "Entry added to favorites!"
        : "Entry removed from favorites!",
      data: entry,
    });
  } catch (error) {
    console.error("Error toggling favorite!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const searchEntries = async (req, res) => {
  const loggedUser = req.user;
  const queryText = req.query.text;

  if (!queryText?.trim()) {
    return res.status(400).json({ message: "Search text is required!" });
  }

  if (queryText.length > 100) {
    return res
      .status(422)
      .json({ message: "Search string cannot be exceed 100 charactere!" });
  }

  try {
    const entries = await Entry.find({
      $and: [
        {
          $or: [
            { title: { $regex: queryText, $options: "i" } },
            { content: { $regex: queryText, $options: "i" } },
          ],
        },
        { createdBy: loggedUser._id },
      ],
    }).sort({ date: -1 });

    res.status(200).json({
      message:
        entries.length === 0
          ? "No entries found!"
          : "Entries fetched successfully!",
      data: entries,
    });
  } catch (error) {
    console.error("Error searching the entry!", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  toggleFavorite,
  searchEntries,
};
