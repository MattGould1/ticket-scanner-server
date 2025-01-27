import Router from "@koa/router";
import routerHandler from "src/router/lib/handler";
import loginHandler from "./login";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/login", routerHandler(loginHandler));
