import { GraphQLResolveInfo } from "graphql";
import { EventAttendeeModel } from "src/database/models/eventAttendee";
import { GraphQLContext } from "src/graphql/types";
import { Query, QueryGetEventAttendeesArgs } from "src/graphql/types/graphql";

const getEventAttendeesResolver = async (
  _source: null,
  args: QueryGetEventAttendeesArgs,
  ctx: GraphQLContext,
  _info: GraphQLResolveInfo
): Promise<Query["getEventAttendees"]> => {
  const { teamId } = ctx.user;
  const { eventId, pagination } = args;

  const total = await EventAttendeeModel.countDocuments({
    teamId,
    eventId,
  });

  const attendees = await EventAttendeeModel.find({
    teamId,
    eventId,
  })
    .limit(pagination?.limit ?? 0)
    .skip(pagination?.offset ?? 0);

  return {
    attendees: attendees.map((attendee) => {
      console.log(attendee, attendee.name);
      return {
        ...attendee.toJSON(),
        id: attendee._id.toString(),
        ticketId: attendee.ticketId.toString(),
        checkedInAt: attendee.checkedInAt
          ? new Date(attendee.checkedInAt)
          : null,
      };
    }),
    total,
  };
};

export default getEventAttendeesResolver;
