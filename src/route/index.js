import express from "express";
import userApi from "./user/user.js";
import webApi from "./web/index.js";
import boxchatApi from "./boxchat/boxchat.js";

const routeapi = express.Router();

routeapi.use("/user", userApi);
routeapi.use("/boxchat", boxchatApi);
routeapi.use("/", webApi);

export default routeapi;
