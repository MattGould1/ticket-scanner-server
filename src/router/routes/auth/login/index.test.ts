describe("auth", () => {
  it("Logs us in", async () => {
    const result = await fetch(
      `${process.env.BASE_URL}:${process.env.PORT}/auth/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "matthew@gould.com",
          password: "password",
        }),
      }
    );

    const json = await result.json();

    expect(result.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(json.token).toBeDefined();
  });

  it("Cannot find the user so returns 401", async () => {
    const result = await fetch(
      `${process.env.BASE_URL}:${process.env.PORT}/auth/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "unknown@unknown.com",
          password: "password",
        }),
      }
    );

    expect(result.status).toBe(401);
  });
});
