import { doQuery } from "../../../__test__/axios";
import { GET_EVENT_ATTENDEES, GET_EVENTS } from "../../../__test__/graphql";
import getToken from "../../../../__test__/lib/getToken";
import {
  Query,
  QueryGetEventAttendeesArgs,
  QueryGetEventsArgs,
} from "src/graphql/types/graphql";

describe("getEventAttendeesResolver", () => {
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

    expect(getEventAttendees.total).toBe(1);
  });
});
