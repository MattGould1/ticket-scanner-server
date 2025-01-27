import { buildSchema } from "graphql";
import fs from "fs";
import path from "path";
import { graphqlHTTP } from "koa-graphql";
import createSchemaWithDirectives from "./lib/createSchemaWithDirectives";
import Koa from "koa";
import jwtAuthentication from "./middleware/jwtAuthentication";
import resolvers from "./resolvers";

const getGraphql = (): Parameters<typeof graphqlHTTP>[0] => {
  const schemaDef = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
  );
  const baseSchema = buildSchema(schemaDef);
  const schema = createSchemaWithDirectives(baseSchema);

  return {
    schema,
    rootValue: {
      getUser: resolvers.getUserResolver,
    },
    graphiql: {
      headerEditorEnabled: true,
    },
  };
};

const graphqlApp = new Koa();

// Apply multiple middleware to the GraphQL app
graphqlApp.use(jwtAuthentication);
graphqlApp.use(graphqlHTTP(getGraphql()));

export default graphqlApp;
