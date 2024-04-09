import express from "express";
import webApi from "@/route/web";
import userApi from "@/route/user";
import boxchat from "@/route/boxchat";

const routeapi = express.Router();

routeapi.use("/user", userApi);
routeapi.use("/boxchat", boxchat);
routeapi.use("/", webApi);

export default routeapi;
