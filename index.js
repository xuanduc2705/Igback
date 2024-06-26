import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import route from "@/route/index.js";
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
app.use(route);
// TEST VOI INDEX.JS
// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "clean": "rm -rf build && mkdir build",
//   "build-babel": "babel ./src -d ./build/src",
//   "build": "npm run clean && npm run build-babel",
//   "production": "npm run build && node ./build/index.js",
//   "dev": "nodemon --exec ./node_modules/.bin/babel-node ./index.js"
// },
