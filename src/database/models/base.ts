import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

export type BaseDocument = Document & {
  createdAt: Date;
  updatedAt: Date;
};

export const baseSchema = new Schema(
  {
    // @TODO base fields?
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Includes virtual properties when document is converted to JSON
    toObject: { virtuals: true }, // Includes virtual properties when document is converted to a plain JavaScript object
  }
);

export type BaseSchemaType = InferSchemaType<typeof baseSchema> & {
  id: string;
  _id: mongoose.Types.ObjectId;
  __v: number;
};
