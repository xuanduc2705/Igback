// import BoxchatController from "@/controller/BoxchatController";
import addMessageToBoxchat from "@/controller/socketmessage";
import { getBoxchat, addBoxchat } from "./BoxchatController";
import { login, Register, getUser } from "./UserController";

export {
  getBoxchat,
  addBoxchat,
  login,
  Register,
  getUser,
  addMessageToBoxchat,
};
