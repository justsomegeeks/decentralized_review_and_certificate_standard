import mongoose from "mongoose";

type ReviewType = {
  cid: string;
  reviewer: string;
  overallRating: number;
  courseAddress: string;
};

const Review = new mongoose.Schema<ReviewType>(
  {
    cid: {
      type: String,
      unique: true,
    },
    reviewer: {
      type: String,
    },
    overallRating: {
      type: Number,
    },
    courseAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<ReviewType>("Review", Review);
