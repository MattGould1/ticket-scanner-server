# Endpoints

## Goals

The goal of this API is to provide a proof of concept ticket verification system that integrates with Checkout Page. It also serves as an example of perhaps how we can use micro services to extend Checkout Page.

POST Login
userName: string;
password: string;

POST Refresh
refreshToken: string;

GET getEvents?limit=10&offset=0
returns the event of the current users team (company)

```ts
event: {
  id: string;
  teamId: string; // Not sure what the term for this is within CP.
  name: string;
  date: string;
  venue?: string;
  description?x: string;
  image?: string;
}
```

GET getEventAttendees?eventId=''&limit=10&offset=0

POST verifyAttendee
ticketId=''

```ts
export type VerifyTicketResponse = {
  id: string;
  purchasedDate: string;
  event: {
    id: string;
    name: string;
    date: string;
    venue: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  seat?: {
    section: string;
    row: string;
    number: string;
  };
  ticketType: string;
  customerSpecialRequest: string;
  hasBeenUsed: boolean;
};
```

POST createTicketQRCode
ticketId: string;
