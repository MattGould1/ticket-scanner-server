import Router from "@koa/router";
import jwt from "koa-jwt";
import { isKoaError } from "src/lib/isKoaError";
import { JWT_SECRET } from "src/lib/jwt";

const jwtAuthentication = jwt({ secret: JWT_SECRET }).unless({
  path: [/^\/auth/, /^\/graphql/],
});

export const jwtErrorHandler: Router.Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (isKoaError(err)) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = { error: "Unauthorized access. Invalid or missing token." };
      }
    }

    // @todo probably don't wanna throw like this?
    throw err;
  }
};

export default jwtAuthentication;
