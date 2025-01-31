import { GraphQLResolveInfo } from "graphql";
import { EventModel } from "src/database/models/event/event";
import { GraphQLContext } from "src/graphql/types";
import { Query, QueryGetEventsArgs } from "src/graphql/types/graphql";

const getEventsResolver = async (
  _source: null,
  args: QueryGetEventsArgs,
  ctx: GraphQLContext,
  _info: GraphQLResolveInfo
): Promise<Query["getEvents"]> => {
  const { teamId } = ctx.user;

  const total = await EventModel.countDocuments({ teamId });
  const events = await EventModel.find({ teamId })
    .limit(args.pagination?.limit ?? 0)
    .skip(args.pagination?.offset ?? 0);

  return {
    events: events.map((event) => {
      return {
        ...event.toJSON(),
        teamId: event.teamId.toString(),
      };
    }),
    total,
  };
};

export default getEventsResolver;
