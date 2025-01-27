import Router from "@koa/router";
import { error500 } from "../errorCodes";
import { ExtendableContext, DefaultState, ParameterizedContext } from "koa";

export type ContextWithBody<T = unknown> = ParameterizedContext & {
  request: ExtendableContext["request"] & {
    body: T;
  };
};

export type RouterMiddlewareWithBody<T = unknown> = Router.Middleware<
  DefaultState,
  ContextWithBody<T>
>;

export type RouterHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: RouterMiddlewareWithBody<any>
) => RouterMiddlewareWithBody<unknown>;
const routerHandler: RouterHandler = (handler) => {
  return async (ctx, next) => {
    try {
      await handler(ctx, next);
    } catch (error) {
      // @TODO implement a logging service
      console.error(error);
      ctx = {
        ...ctx,
        ...error500(),
      };
    }
  };
};

export default routerHandler;
