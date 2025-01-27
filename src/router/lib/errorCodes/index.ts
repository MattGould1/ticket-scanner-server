import Router from "@koa/router";

export const error500 = (ctx: Router.RouterContext) => {
  ctx.status = 500;
  ctx.body = { error: "Internal Server Error" };

  return ctx;
};
