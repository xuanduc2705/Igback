import UserController from "@/controller/UserController.js";
import BoxchatController from "@/controller/BoxchatController";
import express from "express";
const webApi = express.Router();

webApi.post("/register", UserController.Register);
webApi.post("/api/addboxchat", BoxchatController.addBoxchat);
webApi.post("/login", UserController.login);

export default webApi;
