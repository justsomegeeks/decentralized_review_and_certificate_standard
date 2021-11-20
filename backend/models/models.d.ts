import mongoose from "mongoose";

export type Bootcamp = {
  cid: string;
  address: string;
  name: string;
  description: string;
  location: string;
  courses: mongoose.Schema.Types.ObjectId;
  rating: number;
};

export type course = {
  cid: string;
  address: string;
  bootcamp: mongoose.Schema.Types.ObjectId;
  graduations: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId;
};
