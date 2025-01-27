import mongoose, { Schema, InferSchemaType } from "mongoose";

const ObjectId = Schema.ObjectId;

/**
 * The ticket purchased by an attendee
 */
const TicketSchema = new Schema({
  id: { type: ObjectId, required: true },
  /**
   * A company can create multiple events
   */
  eventId: { type: ObjectId, required: true },
  /**
   * Allow for different tiers of tickets
   */
  ticketTypeId: { type: ObjectId, required: true },
  /**
   * The date this ticket was purchased on
   */
  purchaseDate: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

export type TicketModelInputType = InferSchemaType<typeof TicketSchema>;

export { TicketSchema, TicketModel };
