import axios from "axios";
import { DocumentNode, print } from "graphql";
import environment from "src/lib/environment";

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
    `${environment().BASE_URL}:${environment().PORT}/graphql`,
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
