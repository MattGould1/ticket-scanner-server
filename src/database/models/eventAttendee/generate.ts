import { EventAttendeeModel, EventAttendeeModelInputType } from ".";
import { Types } from "mongoose";
import { faker } from "@faker-js/faker";

export const generateEventAttendeeModel = (
  input?: Partial<EventAttendeeModelInputType>
) => {
  const ticket = new EventAttendeeModel({
    id: new Types.ObjectId(),
    eventId: new Types.ObjectId(),
    purchaseDate: new Date(),
    name: "John Doe",
    email: faker.internet.email(),
    phone: faker.phone.number(),
    checkedInAt: false,
    teamId: new Types.ObjectId(),
    ticketId: new Types.ObjectId(),
    ...input,
  });

  return ticket;
};
