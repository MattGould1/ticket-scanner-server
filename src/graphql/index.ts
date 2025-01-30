import fs from "fs";
import path from "path";
import { createSchema, createYoga } from "graphql-yoga";
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

  let schema = makeExecutableSchema({
    typeDefs: [authDirective().authDirectiveTypeDefs, schemaDef],
  });

  schema = authDirective().authDirectiveTransformer(schema);
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
  schema: createSchema({
    typeDefs: buildGraphqlSchemaWithDirectives(),
    resolvers: {
      Query: {
        getUser: resolvers.getUserResolver,
        getEvents: resolvers.getEventsResolver,
      },
    },
  }),
});

const graphqlApp = new Koa();

// Apply multiple middleware to the GraphQL app
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
