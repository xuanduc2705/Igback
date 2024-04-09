import { getUser } from "@/controller";
import express from "express";
const userApi = express.Router();

userApi.get("/api/user", getUser);

export default userApi;
