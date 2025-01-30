import Koa from "koa";
import router from "./router/routes";
import { ticketsRouter } from "./router/routes/tickets";
import { getMongoose } from "./database";
import jwtAuthentication, {
  jwtErrorHandler,
} from "./middleware/jwtAuthentication";
import bodyParser from "koa-bodyparser";
import { authRouter } from "./router/routes/auth";
import mount from "koa-mount";
import graphqlApp from "./graphql";
import cors from "@koa/cors";
import { UserModel } from "./database/models/user";
import { MongoServerError } from "mongodb";
import environment from "./lib/environment";

const app = new Koa();

app.use(
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(jwtErrorHandler);

app.use(jwtAuthentication);
app.use(bodyParser());

app.use(router.routes());
app.use(ticketsRouter.routes());
app.use(authRouter.routes());

app.use(mount("/", graphqlApp));

app.listen(environment().PORT, async () => {
  getMongoose();

  /**
   * Just for demo purposes, password is always "password"
   */
  try {
    await UserModel.create({
      name: "Matthew Gould",
      email: "matthew@gould.com",
    });
  } catch (err: unknown) {
    if (err instanceof MongoServerError && err.code === 11000) {
      console.log("User already exists");

      // await UserModel.deleteMany({ email: "matthew@gould.com" });
      return;
    }

    throw err;
  }

  console.log(
    `Server running on ${environment().BASE_URL}:${environment().PORT}`
  );
});

export { router, app };
