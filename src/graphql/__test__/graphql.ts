import gql from "graphql-tag";

const GET_USER = gql`
  query getUser {
    getUser {
      username
    }
  }
`;

const GET_EVENTS = gql`
  query getEvents($pagination: PaginationInput) {
    getEvents(pagination: $pagination) {
      events {
        name
        startDate
        endDate
        venue
        description
        image
      }
      total
    }
  }
`;

export { GET_USER, GET_EVENTS };
