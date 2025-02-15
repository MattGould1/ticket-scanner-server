import axios from "axios";
import { DocumentNode, print } from "graphql";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doQuery = async <V = any, R = any>({
  query,
  variables,
  token,
}: {
  query: DocumentNode;
  variables?: V;
  token: string;
}): Promise<{ data: R }> => {
  const response = await axios.post<{ data: R }>(
    `${process.env.BASE_URL}:${process.env.PORT}/graphql`,
    {
      query: print(query),
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if ("errors" in response.data) {
    console.log(response.data.errors);
  }

  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doMutation = async <V = any, R = any>({
  query,
  variables,
  token,
}: {
  query: DocumentNode;
  variables?: V;
  token: string;
}): Promise<{ data: R }> => {
  const response = await axios.post<{ data: R }>(
    `${process.env.BASE_URL}:${process.env.PORT}/graphql`,
    {
      query: print(query),
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if ("errors" in response.data) {
    console.log(response.data.errors);
  }

  return response.data;
};

export { doQuery, doMutation };
