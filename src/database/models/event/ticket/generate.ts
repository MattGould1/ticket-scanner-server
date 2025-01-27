import { TicketModel, TicketModelInputType } from ".";
import mongoose from "mongoose";

export const generateTicketModel = (input?: Partial<TicketModelInputType>) => {
  const ticket = new TicketModel({
    id: new mongoose.Types.ObjectId(),
    eventId: new mongoose.Types.ObjectId(),
    ticketTypeId: new mongoose.Types.ObjectId(),
    purchaseDate: new Date(),
    name: "John Doe",
    email: "GgS9H@example.com",
    ...input,
  });

  return ticket;
};
