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
        id
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

const GET_EVENT_ATTENDEES = gql`
  query getEventAttendees($eventId: String!, $pagination: PaginationInput) {
    getEventAttendees(eventId: $eventId, pagination: $pagination) {
      attendees {
        id
        name
        email
        phone
        checkedInAt
        ticketId
      }
      total
    }
  }
`;

export { GET_USER, GET_EVENTS, GET_EVENT_ATTENDEES };
