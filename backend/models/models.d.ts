import mongoose from "mongoose";

export type BootcampSchemaType = {
  cid: string;
  bootcampAddress: string;
  name: string;
  description: string;
  location: string;
  courses: mongoose.Schema.Types.ObjectId;
  reviews: mongoose.Schema.Types.ObjectId;
  rating: number;
};

export type course = {
  cid: string;
  address: string;
  bootcamp: mongoose.Schema.Types.ObjectId;
  graduations: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId;
};
