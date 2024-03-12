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
function generateRandomNumber() {
  const min = 1000000000;
  const max = 9999999999;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString(); // Convert the number to a string
}

const randomNum = generateRandomNumber();
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
      // If boxchat doesn't exist, create a new one
      if (!boxchat) {
        boxchat = new Boxchat({
          boxchatid: randomNum,
          host: host,
          partner: [host, partner],
          msgg: [],
        });
      }

      // Add the new message to the boxchat
      boxchat.msgg.push({
        content,
        id,
        avatar,
      });

      // Save the updated boxchat
      await boxchat.save();
      // Emit the message to all connected clients
      socketIo.emit("sendDataServer", { data });
    } catch (error) {
      console.log("Error adding message to boxchat:", error);
    }
  });
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
app.post("/register", async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newuser = await new User({
      email: email,
      nickname: nickname,
      name: nickname,
      password: hashed,
      avatar: "",
    });
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.use("/boxchat", async (req, res) => {
  try {
    const { host, partner, isg, avatar1, avatar2, groupname } = req.body;

    // Generate a random boxchatid
    const boxchatid = generateRandomNumber();
    let boxchat;
    if (isg == true) {
      const existingBoxchat = await Boxchat.findOne({
        member: partner,
        host: host,
        groupname: groupname,
      });
      if (existingBoxchat) {
        return res.status(400).json({ error: "Already has" });
      }
      boxchat = new Boxchat({
        boxchatid,
        isGroupchat: isg,
        host,
        member: partner,
        groupava: "",
        msgg: [],
        groupname: groupname,
      });
    } else {
      const existingBoxchat1 = await Boxchat.findOne({
        member: partner,
        host: host,
      });
      const existingBoxchat2 = await Boxchat.findOne({
        member: host,
        host: partner,
      });
      if (existingBoxchat1 || existingBoxchat2) {
        return res.status(400).json({ error: "Already has" });
      }
      boxchat = new Boxchat({
        boxchatid,
        isGroupchat: isg,
        host,
        member: partner,
        avatar1: avatar1,
        avatar2: avatar2,
        msgg: [],
      });
    }
    // Save the new Boxchat object to the database
    await boxchat.save();

    res.status(200).json(boxchat);
  } catch (err) {
    res.status(500).json({ error: "Failed to add boxchat" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(404).json({ message: "Incorrect password" });
    }
    if (user && validPass) {
      const accesstoken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ user, accesstoken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(8000, () => {
  console.log("Server is running!");
});
