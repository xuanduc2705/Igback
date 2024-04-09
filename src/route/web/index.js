import express from "express";
import UserWeb from "./UserWeb";
import BoxchatWeb from "./BoxchatWeb";
const app = express();
app.use("/user", UserWeb);
app.use("/boxchat", BoxchatWeb);

export default app;
