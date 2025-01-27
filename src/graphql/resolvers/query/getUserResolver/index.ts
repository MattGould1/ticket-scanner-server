import { GraphQLContext } from "src/graphql/types";

const getUserResolver = (args: { id: string }, context: GraphQLContext) => {
  console.log(args, context.user);
  return {
    username: "Matthew",
    authField: "private info!",
  };
};

export default getUserResolver;
