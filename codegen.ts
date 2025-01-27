import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphql",
  generates: {
    "./src/graphql/types/graphql.ts": {
      plugins: [
        {
          add: {
            content: `/* eslint-disable */
// ====================================================
// THIS IS AN AUTO-GENERATED FILE. DO NOT MODIFY IT.
// ====================================================`,
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
      config: {
        contextType: "./index#GraphQLContext",
        useIndexSignature: true,
        // Optional: if you're using custom scalars
        scalars: {
          DateTime: "Date",
          // Add other custom scalars here
        },
      },
    },
  },
};

export default config;
