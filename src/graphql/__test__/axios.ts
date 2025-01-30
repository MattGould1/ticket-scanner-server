import axios from "axios";
import { DocumentNode, print } from "graphql";

const doQuery = async ({
  query,
  variables,
  token,
}: {
  query: DocumentNode;
  variables?: any;
  token: string;
}) => {
  const response = await axios.post(
    "http://localhost:3000/graphql",
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

  return response.data;
};

export { doQuery };
