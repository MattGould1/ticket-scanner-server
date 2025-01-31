import getUserResolver from "./query/getUserResolver";
import getEventsResolver from "./query/getEventsResolver";
import getEventAttendeesResolver from "./query/getEventAttendeesResolver";
import verifyEventAttendeeResolver from "./mutation/verifyEventAttendeeResolver";

const resolvers = {
  getUserResolver,
  getEventsResolver,
  getEventAttendeesResolver,
  verifyEventAttendeeResolver,
};

export default resolvers;
