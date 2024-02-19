// dependencies
const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const socketIO = require("socket.io");
// const Chatroom = require("./views/chatroom/Chatroom");
const cors = require("cors");

// setup server
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

// endpoints
app.get("/render", (req, res) => {
  const username = req.query.username;
  const roomId = req.query.roomId;
  const response = `<h1>username=${username}, roomId=${roomId}</h1>`;
  res.send(response);
});

const connectedUsersMap = new Map();

io.on("connection", (socket) => {
  if (socket.recovered && !connectedUsersMap.get(socket.id)) {
    socket.emit("usernameRequest", (usernameResponse) =>
      connectedUsersMap.set(`${socket.id}`, `${usernameResponse}`)
    );
  }

  socket.on("nowEntering", (data) => {
    connectedUsersMap.set(`${socket.id}`, `${data}`);
    socket.broadcast.emit("userNowEntering", data);
  });

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data); // emit to all clients
  });

  socket.on("disconnect", (reason) => {
    if (reason == "transport close") {
      const username = connectedUsersMap.get(socket.id);
      if (username) {
        connectedUsersMap.delete(socket.id); // returns true if deleted
        socket.broadcast.emit("userNowLeaving", username);
      }
    }
  });

  // TODO: need client script to specify the connecting room to join
  // socket.on("join", (roomId) => {
  //   socket.join(roomId);
  // });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Node.js Server running on http://localhost:${PORT}`);
});
