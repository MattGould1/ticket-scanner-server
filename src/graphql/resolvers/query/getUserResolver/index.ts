import { GraphQLContext } from "src/graphql/types";
import { Query, QueryGetUserArgs } from "src/graphql/types/graphql";

const getUserResolver = async (
  args: QueryGetUserArgs,
  context: GraphQLContext
): Promise<Query["getUser"]> => {
  console.log(args, context.user);
  return {
    username: "Matthew",
    authField: "private info!",
  };
};

export default getUserResolver;
