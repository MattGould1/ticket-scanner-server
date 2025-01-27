import Router from "@koa/router";
import { error500 } from "../errorCodes";

export type RouterHandler = (handler: Router.Middleware) => Router.Middleware;
const routerHandler: RouterHandler = (handler) => {
  return async (ctx, next) => {
    try {
      await handler(ctx, next);
    } catch (error) {
      // @TODO implement a logging service
      console.error("Error occurred:", error);
      ctx = error500(ctx);
    }
  };
};

export default routerHandler;
