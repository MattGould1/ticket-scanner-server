import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * The types of tickets that can be purchased e.g. perhaps
 *
 * VIP, Standard, etc
 */
const EventTicketType = new Schema({
  id: { type: ObjectId, required: true },
  eventId: { type: ObjectId, required: true },
  name: { type: String, required: true },
});

export default EventTicketType;
