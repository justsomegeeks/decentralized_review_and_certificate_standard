import mongoose from "mongoose";

type review = {
  cid: string;
  reviewer: string;
  // title: string;
  // body: string;
  overallRating: number;
  // cirriculumRating: number
  // jobSupportRating: number
  bootcampAddress: string;
  courseAddress: string;
};

const Review = new mongoose.Schema<review>(
  {
    cid: {
      type: String,
      unique: true,
    },
    reviewer: {
      type: String,
    },
    // TODO: Uncomment after you fetch cid and save it to database
    // title: {
    //   type: String,
    // },
    // body: {
    //   type: String,
    // },
    overallRating: {
      type: Number,
    },
    bootcampAddress: {
      type: String,
    },
    courseAddress: {
      type: String,
    },
    // TODO: Commented for the shake of hackathon.
    // cirriculumRating: {
    //   type: Number
    // },
    // jobSupportRating: {
    //   type: Number
    // }
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", Review);
