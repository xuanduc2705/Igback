import { Register, addBoxchat, login } from "@/controller";
import express from "express";
const webApi = express.Router();

webApi.post("/register", Register);
webApi.post("/api/addboxchat", addBoxchat);
webApi.post("/login", login);

export default webApi;
