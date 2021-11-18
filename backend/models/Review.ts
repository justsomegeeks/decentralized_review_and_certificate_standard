import mongoose from "mongoose";

type review = {
  cid: string;
  reviewer: string
  title: string
  body: string
  overallRating: number
  cirriculumRating: number
  jobSupportRating: number
}

const Review = new mongoose.Schema<review>({
  cid: {
    type: String,
    unique: true,
  },
  reviewer: {
    type: String,
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  overallRating: {
    type: Number
  },
  cirriculumRating: {
    type: Number
  },
  jobSupportRating: {
    type: Number
  }
});

export default mongoose.models.Review || mongoose.model("Review", Review);
