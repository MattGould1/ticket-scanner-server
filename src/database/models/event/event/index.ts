import { InferSchemaType, Schema, model } from "mongoose";
import { baseSchema, BaseSchemaType } from "../../base";

// @TODO just a POC this data comes from CP actually
const EventSchema = new Schema({
  teamId: { type: Schema.ObjectId, required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  venue: { type: String },
  description: { type: String },
  image: { type: String },
}).add(baseSchema);

const EventModel = model<EventModelType>("Event", EventSchema);

export type EventModelInputType = InferSchemaType<typeof EventSchema>;
export type EventModelType = EventModelInputType & BaseSchemaType;

export { EventSchema, EventModel };
