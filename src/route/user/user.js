import UserController from "@/controller/UserController.js";
import express from "express";
const userApi = express.Router();

userApi.get("/api/user", UserController.getUser);

export default userApi;
