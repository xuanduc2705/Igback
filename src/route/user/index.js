import { getUser } from "@/controller";
import Controller from "@/middlewares";
class RouteExtend extends Controller {}
const userApi = new RouteExtend();

userApi.get("/api/user", getUser);

export default userApi.router;
