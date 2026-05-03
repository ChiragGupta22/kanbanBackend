import { config } from "dotenv";
import { connectDB } from "./src/db/db.js";
import app from "./src/app.js";
import http from "http";
import { Server } from "socket.io";

config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://kanban-frontend-s.vercel.app",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ projectId }) => {
    socket.join(projectId);

    console.log(` joined ${projectId} `);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, async () => {
  await connectDB();
  console.log("Server running on port 5000");
});
