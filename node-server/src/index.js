// dependencies
var express = require("express");
const cors = require("cors");
const app = express();

const http = require("http");
const httpServer = http.createServer(app);
const socketIO = require("socket.io");
// const Chatroom = require("./views/chatroom/Chatroom");

const PORT = process.env.PORT || 4000;

const io = socketIO(httpServer, {
  cors: {
    origin: [
      "https://536b-24-130-190-236.ngrok-free.app",
      "http://localhost:5173",
    ],
    allowedHeaders: ["ngrok-skip-browser-warning"],
    credentials: true,
  },
});

// // serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, "public")));

// // endpoints
// app.get("/render", (req, res) => {
//   const username = req.query.username;
//   const roomId = req.query.roomId;
//   const response = `<h1>username=${username}, roomId=${roomId}</h1>`;
//   res.send(response);
// });

const connectedUsersMap = new Map();

io.on("connection", (socket) => {
  socket.on("nowEntering", (data) => {
    connectedUsersMap.set(`${socket.id}`, `${data}`);
    socket.broadcast.emit("userNowEntering", data);
    io.emit("connectedUsers", [...connectedUsersMap.entries()]);
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
      io.emit("connectedUsers", [...connectedUsersMap.entries()]);
    }
  });

  // TODO: need client script to specify the connecting room to join
  // socket.on("join", (roomId) => {
  //   socket.join(roomId);
  // });

  // if (!connectedUsersMap.get(socket.id)) {
  //   socket.emit("usernameRequest", (usernameResponse) => {
  //     console.log("response", usernameResponse);
  //     connectedUsersMap.set(`${socket.id}`, `${usernameResponse}`);
  //   });
  // }

  // io.emit("connectedUsers", connectedUsersMap.values()); // emit to all clients
});

httpServer.listen(PORT, () => {
  console.log(`Node.js Server running on http://localhost:${PORT}`);
});
