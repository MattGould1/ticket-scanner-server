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
import { graphqlHTTP } from "koa-graphql";
import getGraphql, { graphqlAuthenticateUser } from "./graphql";

const app = new Koa();

app.use(jwtErrorHandler);

app.use(jwtAuthentication);
app.use(bodyParser());

app.use(router.routes());
app.use(ticketsRouter.routes());
app.use(authRouter.routes());

// app.use(mount("/graphql", graphqlAuthenticateUser));

// Create a new Koa app for the GraphQL endpoint
const graphqlApp = new Koa();

// Apply multiple middleware to the GraphQL app
graphqlApp.use(graphqlAuthenticateUser);
graphqlApp.use(graphqlHTTP(getGraphql()));

app.use(mount("/graphql", graphqlApp));

const port = 3000;

app.listen(port, () => {
  getMongoose();
  console.log(`Server running on http://localhost:${port}`);
});

export { router, app };
