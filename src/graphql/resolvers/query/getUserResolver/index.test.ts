import { doQuery } from "../../../__test__/axios";
import { GET_USER } from "../../../__test__/graphql";
import getToken from "../../../../__test__/lib/getToken";

describe("getUserResolver", () => {
  it("should return a user", async () => {
    const token = await getToken();

    const response = await doQuery({
      query: GET_USER,
      token,
    });

    console.log(response);
  });
});
