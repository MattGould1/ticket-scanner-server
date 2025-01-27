import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import AuthenticationError from "src/graphql/errors/AuthenticationError";
import { GraphQLContext } from "src/graphql/types";

function createSchemaWithDirectives(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind["OBJECT_FIELD"]]: (fieldConfig, _fieldName, _typeName) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

      if (authDirective) {
        const { resolve: originalResolve = defaultFieldResolver } = fieldConfig;

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
}

export default createSchemaWithDirectives;
