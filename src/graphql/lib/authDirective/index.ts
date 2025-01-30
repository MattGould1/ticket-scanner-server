import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import AuthenticationError from "src/graphql/errors/AuthenticationError";
import { GraphQLContext } from "src/graphql/types";

function authDirective(): {
  authDirectiveTypeDefs: string;
  authDirectiveTransformer: (schema: GraphQLSchema) => GraphQLSchema;
} {
  const directiveName = "auth";
  return {
    authDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    authDirectiveTransformer: (schema: GraphQLSchema) => {
      return mapSchema(schema, {
        [MapperKind["OBJECT_FIELD"]]: (fieldConfig, _fieldName, _typeName) => {
          const authDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          if (authDirective) {
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
