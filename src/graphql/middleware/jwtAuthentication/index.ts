import Router from "@koa/router";
import { GraphQLContext } from "../../types";
import { verifyToken } from "src/lib/jwt";

const jwtAuthentication: Router.Middleware = async (ctx, next) => {
  const token = ctx.headers.authorization?.replace("Bearer ", "");

  if (token) {
    try {
      const user = verifyToken(token) as GraphQLContext["user"];
      ctx.user = user;
    } catch (error) {
      console.error(error);
    }
  }

  await next();
};

export default jwtAuthentication;
