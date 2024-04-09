import { login, Register } from "@/controller";
import RouteExtend from "@/middlewares";

const userWebApi = new RouteExtend();

userWebApi.post("/register", Register);
userWebApi.post("/user/login", login);

export default userWebApi.router;
