import mongoose from "mongoose";
type course = {
  cid: string;
  address: string;
  bootcamp: mongoose.Schema.Types.ObjectId;
  graduations: mongoose.Schema.Types.ObjectId[];
};
const Course = new mongoose.Schema<course>({
  cid: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bootcamp",
  },
  graduations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Graduate",
    },
  ],
});

export default mongoose.models.Course || mongoose.model("Course", Course);
