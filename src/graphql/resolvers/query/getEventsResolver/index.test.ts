import { doQuery } from "../../../__test__/axios";
import { GET_EVENTS } from "../../../__test__/graphql";
import getToken from "../../../../__test__/lib/getToken";
import { Query, QueryGetEventsArgs } from "src/graphql/types/graphql";

describe("getEventsResolver", () => {
  it("should return a user", async () => {
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
  });
});
