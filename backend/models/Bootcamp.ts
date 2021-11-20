import mongoose from "mongoose";
import { Bootcamp } from "./models";

const Bootcamp = new mongoose.Schema<Bootcamp>(
  {
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

    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    collection: "Bootcamps",
  }
);

export default mongoose.models.Bootcamp || mongoose.model("Bootcamp", Bootcamp);
