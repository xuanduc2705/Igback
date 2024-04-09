import { addBoxchat } from "@/controller";
import RouteExtend from "@/middlewares";

const boxchatWebApi = new RouteExtend();

boxchatWebApi.post("/api/addboxchat", addBoxchat);

export default boxchatWebApi.router;
