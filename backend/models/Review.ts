import mongoose from "mongoose";

const Review = new mongoose.Schema({
  cid: {
    type: String,
    unique: true,
  },
  reviewer: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bootcamp",
  },
});

export default mongoose.models.Review || mongoose.model("Review", Review);
