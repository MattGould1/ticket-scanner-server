const getToken = async () => {
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

  const json = (await result.json()) as { token: string };

  console.log(json);

  return json.token;
};

export default getToken;
