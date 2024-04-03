import BoxchatController from "../controller/BoxchatController.js";

const boxchatrouter = require("express").Router();
boxchatrouter.get("/", BoxchatController.getBoxchat);
boxchatrouter.post("/", BoxchatController.addBoxchat);
boxchatrouter.post("/mess", BoxchatController.getBoxchatMess);

export default boxchatrouter;
