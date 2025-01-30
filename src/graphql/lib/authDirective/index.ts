import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import AuthenticationError from "src/graphql/errors/AuthenticationError";
import { GraphQLContext } from "src/graphql/types";

function authDirective(): {
  authDirectiveTypeDefs: string;
  authDirectiveTransformer: (schema: GraphQLSchema) => GraphQLSchema;
} {
  return {
    authDirectiveTypeDefs: `directive @auth on FIELD_DEFINITION`,
    authDirectiveTransformer: (schema: GraphQLSchema) => {
      return mapSchema(schema, {
        [MapperKind["OBJECT_FIELD"]]: (fieldConfig, _fieldName, _typeName) => {
          const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
          console.log("authDirective", authDirective);
          if (authDirective) {
            console.log("resolving field");

            const { resolve: originalResolve = defaultFieldResolver } =
              fieldConfig;

            fieldConfig.resolve = async (
              source,
              args,
              context: GraphQLContext,
              info
            ) => {
              if (!context.user) {
                throw new AuthenticationError();
              }

              return originalResolve(source, args, context, info);
            };
          }

          return fieldConfig;
        },
      });
    },
  };
}

export default authDirective;
