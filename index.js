const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const PORT = 8000;
const IP_ADDRESS = "192.168.251.222";

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("login", (username) => {
    console.log(`User ${username} logged in`);
    socket.username = username;
  });

  socket.on("message", (message) => {
    console.log(`Message from ${socket.username}: ${message}`);
    io.emit("message", `${socket.username}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.username} disconnected`);
  });
});

http.listen(PORT, IP_ADDRESS, () =>
  console.log(`Listening on ${IP_ADDRESS}:${PORT}`)
);
