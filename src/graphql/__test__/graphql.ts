import gql from "graphql-tag";

const GET_USER = gql`
  query getUser {
    getUser {
      username
    }
  }
`;

export { GET_USER };
