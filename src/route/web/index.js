import { UserController, BoxchatController } from "@/controller";
import express from "express";
const webApi = express.Router();

webApi.post("/register", UserController.Register);
webApi.post("/api/addboxchat", BoxchatController.addBoxchat);
webApi.post("/login", UserController.login);

export default webApi;
