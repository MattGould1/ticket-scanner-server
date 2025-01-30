import { UserModel } from "src/database/models/user";
import {
  ContextWithBody,
  RouterMiddlewareWithBody,
} from "../../../lib/handler";
import { generateToken } from "src/lib/jwt";

const error401 = (ctx: ContextWithBody) => {
  ctx.status = 401;
  ctx.body = { message: "Invalid credentials" };
};

const loginHandler: RouterMiddlewareWithBody<{
  email: string;
  password: string;
}> = async (ctx) => {
  // @TODO Use zod for input validation
  const { email, password } = ctx.request.body;

  const user = await UserModel.findOne({ email });
  if (user === null) {
    error401(ctx);
    return;
  }

  // Replace with actual authentication logic
  if (password === "password") {
    const _user = user.toJSON();
    const token = generateToken(_user);
    ctx.body = { token, user: _user };
  } else {
    error401(ctx);
  }
};

export default loginHandler;
