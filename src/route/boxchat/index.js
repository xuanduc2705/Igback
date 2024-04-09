import { getBoxchat } from "@/controller";
import express from "express";
const boxchat = express.Router();

boxchat.get("/api/boxchat", getBoxchat);
// boxchat.post("/api/boxchat/mess", BoxchatController.getBoxchatMess);

export default boxchat;
