describe("auth", () => {
  it("Logs us in", async () => {
    const result = await fetch("http://localhost:3000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
    });

    const json = await result.json();

    console.log(json);
  });
});
