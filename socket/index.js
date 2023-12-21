const io = require("socket.io")(8800, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:4000"],
  },
});
let activeUsers = [];
io.on("connection", (socket) => {
  socket.on("new-add-user", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected user", activeUsers);

    io.emit("get-users", activeUsers);
  });
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    console.log("activeUser", activeUsers);
    const user = activeUsers?.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    console.log("user:", user);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});
