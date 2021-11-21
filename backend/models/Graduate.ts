import mongoose from "mongoose";
import Course from "./Course";
import Bootcamp from "./Bootcamp";

const Graduate = new mongoose.Schema(
  {
    cid: {
      type: String,
      unique: true,
    },
    root: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
    },
    bootcamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Bootcamp,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Graduate || mongoose.model("Graduate", Graduate);
