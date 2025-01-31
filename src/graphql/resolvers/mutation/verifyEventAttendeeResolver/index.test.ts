import { doMutation, doQuery } from "../../../__test__/axios";
import {
  GET_EVENT_ATTENDEES,
  GET_EVENTS,
  VERIFY_EVENT_ATTENDEE,
} from "../../../__test__/graphql";
import getToken from "../../../../__test__/lib/getToken";
import {
  Mutation,
  MutationVerifyEventAttendeeArgs,
  Query,
  QueryGetEventAttendeesArgs,
  QueryGetEventsArgs,
} from "src/graphql/types/graphql";

describe("verifyEventAttendeeResolver", () => {
  it("should work", async () => {
    const token = await getToken();

    const response = await doQuery<
      QueryGetEventsArgs,
      { getEvents: Query["getEvents"] }
    >({
      query: GET_EVENTS,
      variables: {
        pagination: {
          offset: 0,
          limit: 10,
        },
      },
      token,
    });

    expect(response.data.getEvents.total).toBe(1);

    const {
      data: { getEventAttendees },
    } = await doQuery<
      QueryGetEventAttendeesArgs,
      { getEventAttendees: Query["getEventAttendees"] }
    >({
      query: GET_EVENT_ATTENDEES,
      variables: {
        eventId: response.data.getEvents.events[0]?.id ?? "",
      },
      token,
    });

    const {
      data: { verifyEventAttendee },
    } = await doMutation<
      MutationVerifyEventAttendeeArgs,
      { verifyEventAttendee: Mutation["verifyEventAttendee"] }
    >({
      query: VERIFY_EVENT_ATTENDEE,
      variables: {
        eventId: response.data.getEvents.events[0]?.id ?? "",
        eventAttendeeId: getEventAttendees.attendees[0]?.id ?? "",
      },
      token,
    });

    expect(verifyEventAttendee.alreadyCheckedIn).toBeDefined();
  });
});
