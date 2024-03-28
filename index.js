const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userroute = require("./src/route/userroute");
const courseroute = require("./src/route/courseroute");
const messroute = require("./src/route/messroute");
const boxchatroute = require("./src/route/boxchatroute");
const User = require("./src/model/user");
const http = require("http");
const Boxchat = require("./src/model/boxchat");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
dotenv.config();
app.use(bodyParser.json({ limit: "500mb" }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));
app.use("/api/user", userroute);
app.use("/api/course", courseroute);
app.use("/api/mess", messroute);
app.use("/api/boxchat", boxchatroute);
app.use("/register", userroute);
app.use("/boxchat", boxchatroute);
app.use("/", userroute);

server.listen(8000, () => {
  console.log("Server is running!");
});
mongoose
  .connect("mongodb://localhost:27017/Instagram")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on("sendDataClient", async function (data) {
    try {
      const { isGroupchat, boxchatid, content, id, avatar } = data;
      let boxchat = await Boxchat.findOne({
        boxchatid: boxchatid,
      });

      boxchat.msgg.push({
        content,
        id,
        avatar,
      });
      await boxchat.save();
      socketIo.emit("sendDataServer", { data });
    } catch (error) {
      console.log("Error adding message to boxchat:", error);
    }
  });
});
