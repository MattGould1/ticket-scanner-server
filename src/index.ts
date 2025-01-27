import Koa from "koa";
import router from "./router";
import { ticketsRouter } from "./router/tickets";
import { getMongoose } from "./database";
import jwtAuthentication from "./middleware/jwtAuthentication";

const app = new Koa();

app.use(jwtAuthentication);

app.use(router.routes());
app.use(ticketsRouter.routes());

const port = 3000;

app.listen(port, () => {
  getMongoose();
  console.log(`Server running on http://localhost:${port}`);
});

export { router, app };
