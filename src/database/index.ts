import mongoose from "mongoose";

let _mongoose: typeof mongoose | undefined;

export const getMongoose = async () => {
  if (!_mongoose) {
    _mongoose = await mongoose.connect(
      "mongodb://mongodb:28017/ticket-scanner"
    );
  }

  return _mongoose;
};
