import fs from "fs";
import path from "path";
import { createYoga } from "graphql-yoga";
import Koa from "koa";
import jwtAuthentication from "./middleware/jwtAuthentication";
import resolvers from "./resolvers";
import authDirective from "./lib/authDirective";
import { makeExecutableSchema } from "@graphql-tools/schema";

const buildGraphqlSchemaWithDirectives = () => {
  const schemaDef = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
  );

  const _authDirective = authDirective();

  let schema = makeExecutableSchema({
    typeDefs: [_authDirective.authDirectiveTypeDefs, schemaDef],
    resolvers: {
      Query: {
        getUser: resolvers.getUserResolver,
        getEvents: resolvers.getEventsResolver,
      },
    },
  });

  schema = _authDirective.authDirectiveTransformer(schema);

  return schema;
};

const yoga = createYoga<Koa.ParameterizedContext>({
  graphiql: {
    defaultQuery: `
      query {
        getUser {
          username  
          teamId
          teamName
        }
      }
    `,
  },
  schema: buildGraphqlSchemaWithDirectives(),
});

const graphqlApp = new Koa();

graphqlApp.use(jwtAuthentication);
graphqlApp.use(async (ctx) => {
  const response = await yoga.handleNodeRequestAndResponse(
    ctx.request,
    ctx.res,
    ctx
  );

  // Set status code
  ctx.status = response.status;

  // Set headers
  response.headers.forEach((value, key) => {
    ctx.append(key, value);
  });

  // Converts ReadableStream to a NodeJS Stream
  ctx.body = response.body;
});

export default graphqlApp;
