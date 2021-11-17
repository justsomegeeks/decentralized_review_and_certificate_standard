import mongoose from "mongoose";

const Course = new mongoose.Schema({
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
});

export default mongoose.models.Course || mongoose.model("Course", Course);
