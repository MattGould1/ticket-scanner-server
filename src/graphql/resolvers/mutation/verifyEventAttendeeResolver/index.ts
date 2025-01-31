import { GraphQLResolveInfo } from "graphql";
import { EventAttendeeModel } from "src/database/models/eventAttendee";
import { GraphQLContext } from "src/graphql/types";
import {
  Mutation,
  MutationVerifyEventAttendeeArgs,
} from "src/graphql/types/graphql";

const verifyEventAttendeeResolver = async (
  _source: null,
  args: MutationVerifyEventAttendeeArgs,
  ctx: GraphQLContext,
  _info: GraphQLResolveInfo
): Promise<Mutation["verifyEventAttendee"]> => {
  const { eventId, eventAttendeeId } = args;

  const eventAttendee = await EventAttendeeModel.findOne({
    teamId: ctx.user.teamId,
    eventId,
    _id: eventAttendeeId,
  });

  if (!eventAttendee) {
    throw new Error("Event attendee not found");
  }

  const alreadyCheckedIn = !!eventAttendee.checkedInAt;

  if (!alreadyCheckedIn) {
    eventAttendee.checkedInAt = new Date();
    await eventAttendee.save();
  }

  return {
    eventAttendee: {
      ...eventAttendee.toJSON(),
      id: eventAttendee._id.toString(),
      ticketId: eventAttendee.ticketId.toString(),
      checkedInAt: eventAttendee.checkedInAt
        ? new Date(eventAttendee.checkedInAt)
        : null,
    },
    alreadyCheckedIn,
  };
};

export default verifyEventAttendeeResolver;
