import mongoose from "mongoose";

const Graduate = new mongoose.Schema(
  {
    cid: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Graduate || mongoose.model("Graduate", Graduate);
