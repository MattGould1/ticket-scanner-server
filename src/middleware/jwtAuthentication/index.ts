import jwt from "koa-jwt";
import { JWT_SECRET } from "src/lib/jwt";

const jwtAuthentication = jwt({ secret: JWT_SECRET }).unless({
  path: [/^\/auth/],
});

export default jwtAuthentication;
