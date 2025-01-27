import { RouterMiddlewareWithBody } from "../../../lib/handler";
import { generateToken } from "src/lib/jwt";

const loginHandler: RouterMiddlewareWithBody<{
  username: string;
  password: string;
}> = async (ctx) => {
  const { username, password } = ctx.request.body;

  // Replace with your own authentication logic
  if (username === "username" && password === "password") {
    const token = generateToken({ username });
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { error: "Invalid credentials" };
  }
};

export default loginHandler;
