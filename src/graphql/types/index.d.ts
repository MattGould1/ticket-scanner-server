import { Context } from "koa";
import { VerifiedUserToken } from "src/lib/jwt";

export type GraphQLContext = Context & {
  user?: VerifiedUserToken;
};
