import express from "express";
import cors from "cors";
const app = express();
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import userApi from "./src/api/user.js";
import boxchatApi from "./src/api/boxchat.js";
import http from "http";
import socketHandler from "./src/config/socket.js";
const server = http.createServer(app);
import { Server } from "socket.io";

const socketIo = new Server(server, {
  cors: {
    origin: "*",
  },
});
dotenv.config();
app.use(bodyParser.json({ limit: "500mb" }));
app.use(cors());
app.use(morgan("common"));
app.use("/user", userApi);
app.use("/boxchat", boxchatApi);
server.listen(8000, () => {
  console.log("Server is running!");
});
socketIo.on("connection", (socket) => {
  socketHandler(socket, socketIo);
});
