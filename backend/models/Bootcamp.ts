import mongoose from "mongoose";
import { Bootcamp } from "./models";
import Course from "./Course";

const Bootcamp = new mongoose.Schema<Bootcamp>({
  cid: { type: String, unique: true },

  address: {
    type: String,
  },
  // TODO: Uncomment after fetching bootcamp cid in helper/handleNewBootcamp
  // description: {
  //   type: String,
  // },
  // location: {
  //   type: String,
  // },

  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: Course }],
});

export default mongoose.models.Bootcamp || mongoose.model("Bootcamp", Bootcamp);
