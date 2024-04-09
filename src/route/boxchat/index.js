import { BoxchatController } from "@/controller";
import express from "express";
const boxchat = express.Router();

boxchat.get("/api/boxchat", BoxchatController.getBoxchat);
// boxchat.post("/api/boxchat/mess", BoxchatController.getBoxchatMess);

export default boxchat;
