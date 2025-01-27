import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Event = new Schema({
  id: { type: ObjectId, required: true },
  companyId: { type: ObjectId, required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  seatAvailability: { type: Number },
});

export default Event;
