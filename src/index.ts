import Koa from "koa";
import router from "./router/routes";
import { ticketsRouter } from "./router/routes/tickets";
import { getMongoose } from "./database";
import jwtAuthentication, {
  jwtErrorHandler,
} from "./middleware/jwtAuthentication";
import bodyParser from "koa-bodyparser";
import { authRouter } from "./router/routes/auth";

const app = new Koa();

app.use(jwtErrorHandler);

app.use(jwtAuthentication);
app.use(bodyParser());

app.use(router.routes());
app.use(ticketsRouter.routes());
app.use(authRouter.routes());

const port = 3000;

app.listen(port, () => {
  getMongoose();
  console.log(`Server running on http://localhost:${port}`);
});

export { router, app };
