import UserController from "../controller/UserController.js";

const userrouter = require("express").Router();
userrouter.get("/", UserController.getUser);
userrouter.post("/", UserController.Register);
userrouter.post("/login", UserController.login);
export default userrouter;
