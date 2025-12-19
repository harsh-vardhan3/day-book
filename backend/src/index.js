const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Store active users
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("user-online", (userId) => {
    activeUsers.set(userId, socket.id);
    io.emit("user-status", { userId, status: "online" });
  });

  socket.on("new-comment", (data) => {
    io.emit("comment-added", data);
  });

  socket.on("entry-shared", (data) => {
    io.emit("entry-shared-notification", data);
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of activeUsers.entries()) {
      if (socketId === socket.id) {
        activeUsers.delete(userId);
        io.emit("user-status", { userId, status: "offline" });
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");

// Make io available to routes
app.set("io", io);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/collaboration", collaborationRoutes);

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Database not connected! " + error);
  });
