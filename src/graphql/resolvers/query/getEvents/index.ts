import { GraphQLContext } from "src/graphql/types";
import { Query } from "src/graphql/types/graphql";

const getEventsResolver = async (
  _args: null,
  _context: GraphQLContext
): Promise<Query["getEvents"]> => {
  return {
    events: [],
    total: 0,
  };
};

export default getEventsResolver;
