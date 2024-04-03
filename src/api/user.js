import UserController from "../controller/UserController.js";
import express from "express";
const userApi = express.Router();

userApi.get("/api/user", UserController.getUser);
userApi.post("/register", UserController.Register);
userApi.post("/login", UserController.login);

// module.exports = { userApi };
export default userApi;
