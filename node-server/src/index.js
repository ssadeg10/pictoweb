const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const socketIO = require("socket.io");
// const Chatroom = require("./views/chatroom/Chatroom");
const cors = require("cors");

const app = express();
app.use(cors());
const server = createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/render", (req, res) => {
  const username = req.query.username;
  const roomId = req.query.roomId;
  const response = `<h1>username=${username}, roomId=${roomId}</h1>`;
  res.send(response);
});

io.on("connection", (socket) => {
  // console.log(`user connected: ${socket.id}`);

  socket.on("sendMessage", (data) => {
    // console.log("\trecieved message");
    io.emit("receiveMessage", data); // emit to all clients
  });

  // TODO: need client script to specify the connecting room to join
  // socket.on("join", (roomId) => {
  //   socket.join(roomId);
  // });

  // socket.on("disconnect", (reason) => {
  //   console.log(`user disconnected: ${socket.id}`);
  // });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Node.js Server running on http://localhost:${PORT}`);
});
