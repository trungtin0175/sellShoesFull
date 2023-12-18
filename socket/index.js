// const { createServer } = require("http");
// const { Server } = require("socket.io");

// // const httpServer_admin = createServer();
// // const io_admin = new Server(httpServer_admin, {
// //   cors: "http://localhost:4000",
// // });

// // io_admin.on("connection", (socket) => {
// //   console.log("new connection", socket.id);
// // });

// // httpServer_admin.listen(4000, () => {
// //   console.log("Socket.IO server listening on port 4000");
// // });

// const httpServer = createServer();
// // const io_user = new Server(httpServer_user, {
// //   cors: "http://localhost:5000",
// // });
// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });
// io.on("connection", (socket) => {
//   console.log("new connection", socket.id);
// });

// httpServer.listen(5000, () => {
//   console.log("Socket.IO server listening on port 5000");
// });

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });

// let activeUsers = [];

// io.on("connection", (socket) => {
//   // add new User
//   socket.on("new-user-add", (newUserId) => {
//     // if user is not added previously
//     if (!activeUsers.some((user) => user.userId === newUserId)) {
//       activeUsers.push({ userId: newUserId, socketId: socket.id });
//       console.log("New User Connected", activeUsers);
//     }
//     // send all active users to new user
//     io.emit("get-users", activeUsers);
//   });

//   socket.on("disconnect", () => {
//     // remove user from active users
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log("User Disconnected", activeUsers);
//     // send all active users to all users
//     io.emit("get-users", activeUsers);
//   });

//   // send message to a specific user
//   socket.on("send-message", (data) => {
//     const { receiverId } = data;
//     const user = activeUsers.find((user) => user.userId === receiverId);
//     console.log("Sending from socket to :", receiverId);
//     console.log("Data: ", data);
//     if (user) {
//       io.to(user.socketId).emit("recieve-message", data);
//     }
//   });
// });

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });

// let activeUsers = [];

// io.on("connection", (socket) => {
//   // add new User
//   socket.on("new-user-add", (newUserId) => {
//     if (!activeUsers.some((user) => user.userId === newUserId)) {
//       activeUsers.push({ userId: newUserId, socketId: socket.id });
//       console.log("New User Connected", activeUsers);
//     }
//     io.emit("get-users", activeUsers);

//     // Gửi tin nhắn chào mừng cho người dùng mới
//     io.to(socket.id).emit("recieve-message", {
//       content: "Chào mừng bạn đã tham gia!",
//       senderId: "system", // Một ID đặc biệt để biểu thị tin nhắn từ hệ thống
//     });
//   });

//   socket.on("disconnect", () => {
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log("User Disconnected", activeUsers);
//     io.emit("get-users", activeUsers);
//   });

//   // send message to all users
//   socket.on("send-message", (data) => {
//     io.emit("recieve-message", data);
//   });
// });

// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Địa chỉ cụ thể bạn sử dụng trong cors nếu cần
// const corsOptions = {
//   cors: {
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST"],
//   },
// };

// io.on("connection", (socket) => {
//   console.log("A user connected");
//   // Gửi tin nhắn chào mừng
//   socket.emit("recieve-message", {
//     content: "Chào mừng bạn đã kết nối!",
//     senderId: "system",
//   });

//   // Xử lý các sự kiện khác ở đây

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// console.log("port", PORT);

// const express = require("express");
// const app = express();
// const PORT = 3500;

// //New imports
// const http = require("http").Server(app);
// const cors = require("cors");

// app.use(cors());

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Hello world",
//   });
// });

// http.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
// const socketIO = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });

// //Add this before the app.get() block
// socketIO.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

const io = require("socket.io")(8800, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:4000"],
  },
});
let activeUsers = [];
io.on("connection", (socket) => {
  //add new user
  socket.on("new-add-user", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected user", activeUsers);

    io.emit("get-users", activeUsers);
  });
  // send message to a specific user
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
