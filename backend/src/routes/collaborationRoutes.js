const express = require("express");
const {
  shareEntry,
  unshareEntry,
  getSharedWithMe,
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/collaborationController");
const auth = require("../middleware/authMiddleware");

const collaborationRoutes = express.Router();

// Share endpoints
collaborationRoutes.post("/share", auth, shareEntry);
collaborationRoutes.post("/unshare", auth, unshareEntry);
collaborationRoutes.get("/shared-with-me", auth, getSharedWithMe);

// Comment endpoints
collaborationRoutes.post("/comment", auth, addComment);
collaborationRoutes.get("/comments/:entryId", auth, getComments);
collaborationRoutes.delete("/comment/:commentId", auth, deleteComment);

module.exports = collaborationRoutes;
