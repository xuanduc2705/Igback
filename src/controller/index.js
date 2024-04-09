import addMessageToBoxchat from "@/controller/socketmessage";
import { getBoxchat, addBoxchat } from "./BoxchatController";
import { getUser, Register, login } from "./UserController";

export {
  getBoxchat,
  addBoxchat,
  addMessageToBoxchat,
  getUser,
  Register,
  login,
};
