/* eslint-disable @typescript-eslint/no-unsafe-return */
import { buildSchema, GraphQLSchema, defaultFieldResolver } from "graphql";
import fs from "fs";
import path from "path";
import { graphqlHTTP } from "koa-graphql";
import { Context } from "koa";
import { verifyToken } from "src/lib/jwt";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import Router from "@koa/router";

class AuthenticationError extends Error {
  constructor() {
    super("Authentication required");
    this.name = "AuthenticationError";
  }
}

function createSchemaWithAuthDirectives(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    // Handle object fields
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    [MapperKind["OBJECT_FIELD"]]: (fieldConfig, _fieldName, typeName) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
      // const hasRoleDirective = getDirective(
      //   schema,
      //   fieldConfig,
      //   "hasRole"
      // )?.[0];

      if (authDirective) {
        const { resolve: originalResolve = defaultFieldResolver } = fieldConfig;

        // console.log("fieldConfig", fieldConfig);
        // Replace resolver with auth check
        fieldConfig.resolve = async (
          source,
          args,
          context: GraphQLContext,
          info
        ) => {
          console.log("ctx", context.headers.authorization);
          if (!context.user) {
            throw new Error("Authentication required");
          }

          return originalResolve(source, args, context, info);
        };
      }

      // if (hasRoleDirective) {
      //   const { resolve: originalResolve = defaultFieldResolver } = fieldConfig;
      //   const requiredRole = hasRoleDirective["role"];

      //   fieldConfig.resolve = async (
      //     source,
      //     args,
      //     context: GraphQLContext,
      //     info
      //   ) => {
      //     if (!context.user) {
      //       throw new Error("Authentication required");
      //     }

      //     if (!context.user.roles?.includes(requiredRole)) {
      //       throw new Error(`Required role: ${requiredRole}`);
      //     }

      //     return originalResolve(source, args, context, info);
      //   };
      // }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fieldConfig;
    },
  });
}

type GraphQLContext = Context & {
  user?: {
    username: string;
  };
};

export const graphqlAuthenticateUser: Router.Middleware = async (ctx, next) => {
  console.log("here");
  const token = ctx.headers.authorization?.replace("Bearer ", "");

  console.log("token", token, ctx.headers.authorization);

  if (token) {
    try {
      const user = verifyToken(token) as GraphQLContext["user"];
      ctx.user = user;
    } catch (error) {
      console.error(error);
    }
  }

  await next();
};

const getGraphql = (): Parameters<typeof graphqlHTTP>[0] => {
  const schemaDef = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
  );
  const baseSchema = buildSchema(schemaDef);
  const schema = createSchemaWithAuthDirectives(baseSchema);

  return {
    schema,
    rootValue: {
      getUser() {
        return {
          username: "Matthew",
          authField: "private info!",
        };
      },
    },
    graphiql: {
      headerEditorEnabled: true,
    },
  };
};

export default getGraphql;
