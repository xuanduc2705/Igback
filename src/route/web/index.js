import { login, addBoxchat, Register } from "@/controller";
import Controller from "@/middlewares";
class RouteExtend extends Controller {}
const webApi = new RouteExtend();
webApi.post("/register", Register);
webApi.post("/api/addboxchat", addBoxchat);
webApi.post("/user/login", login);

export default webApi.router;
