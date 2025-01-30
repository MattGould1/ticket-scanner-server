import { GraphQLContext } from "src/graphql/types";
import { Query } from "src/graphql/types/graphql";

const getUserResolver = async (
  _args: null,
  _context: GraphQLContext
): Promise<Query["getUser"]> => {
  return {
    username: "Matthew",
    teamId: "123",
    teamName: "Checkout Page",
  };
};

export default getUserResolver;
