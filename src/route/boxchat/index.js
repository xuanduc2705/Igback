import { getBoxchat } from "@/controller";
import Controller from "@/middlewares";
class RouteExtend extends Controller {}
const boxchat = new RouteExtend();

boxchat.get("/api/boxchat", getBoxchat);
// boxchat.post("/api/boxchat/mess", BoxchatController.getBoxchatMess);

export default boxchat.router;
