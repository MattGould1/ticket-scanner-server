import { Schema, InferSchemaType, model } from "mongoose";
import { baseSchema, BaseSchemaType } from "../base";

/**
 * A super simple user model, with no password (just for testing)
 */
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}).add(baseSchema);

const UserModel = model<UserModelType>("User", UserSchema);

export type UserModelInputType = InferSchemaType<typeof UserSchema>;
export type UserModelType = UserModelInputType & BaseSchemaType;

export { UserSchema, UserModel };
