import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket?.server?.io) {
    console.log("Socket.IO already initialized.");
    return res.end();
  }

  // Initialize Socket.IO server
  const io = new Server(res.socket.server);
  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    socket.on("chat message", (msg) => {
      console.log("Message received:", msg);
      // Emit message to all connected clients
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  // Attach io to the server
  res.socket.server.io = io;
  res.end();
}
