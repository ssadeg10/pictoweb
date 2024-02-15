const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const socketIO = require("socket.io");
const Chatroom = require("./views/chatroom/Chatroom");

const app = express();
const server = createServer(app);
const io = socketIO(server);

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/render", (req, res) => {
  const username = req.query.username;
  const roomId = req.query.roomId;
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  // TODO: need client script to specify the connecting room to join
  socket.on("join", (roomId) => {
    socket.join(roomId);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Node.js Server running on http://localhost:${PORT}`);
});
