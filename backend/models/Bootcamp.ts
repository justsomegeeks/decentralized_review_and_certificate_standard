import mongoose from "mongoose";
import { BootcampSchemaType } from "./models";
import Course from "./Course";
import Review from "./Review";

const BootcampSchema = new mongoose.Schema<BootcampSchemaType>({
  cid: { type: String, unique: true },

  bootcampAddress: {
    type: String,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: Course }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: Review }],
});

export default mongoose.models.Bootcamp ||
  mongoose.model<BootcampSchemaType>("Bootcamp", BootcampSchema);
