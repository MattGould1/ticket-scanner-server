import mongoose, { Schema, InferSchemaType } from "mongoose";
import { baseSchema, BaseSchemaType } from "../base";

const ObjectId = Schema.ObjectId;

/**
 * Schema for event attendees
 */
const EventAttendeeSchema = new Schema({
  teamId: { type: String, required: true },
  eventId: { type: ObjectId, required: true },
  ticketId: { type: ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  customerSpecialRequest: { type: String, required: false },
  checkedInAt: { type: Date, required: false },
}).add(baseSchema);

const EventAttendeeModel = mongoose.model("EventAttendee", EventAttendeeSchema);

export type EventAttendeeModelInputType = InferSchemaType<
  typeof EventAttendeeSchema
>;
export type EventAttendeeModelType = EventAttendeeModelInputType &
  BaseSchemaType;

export { EventAttendeeSchema, EventAttendeeModel };
