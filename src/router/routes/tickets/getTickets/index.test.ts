import environment from "src/lib/environment";
import getToken from "../../../../__test__/lib/getToken";

describe("tickets", () => {
  it("Gets tickets", async () => {
    const token = await getToken();

    const result = await fetch(
      `${environment().BASE_URL}:${environment().PORT}/auth/login`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await result.json();

    console.log(json);
  });
});
