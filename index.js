import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import routeapi from "@/route";
import socketHandler from "@/config/socket";
const app = express();
const server = http.createServer(app);
const socketIo = new Server(server, {
  cors: {
    origin: "*",
  },
});
server.listen(8000, () => {
  console.log("Server is running!");
});

socketIo.on("connection", (socket) => {
  socketHandler(socket, socketIo);
});
dotenv.config();
app.use(cors());
app.use(morgan("common"));

app.use(routeapi);
