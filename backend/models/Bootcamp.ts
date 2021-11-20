import mongoose from "mongoose";

type Bootcamp = {
  cid: string;
  address: string;
  description: string;
  location: string;
  courses: mongoose.Schema.Types.ObjectId;
  reviews: mongoose.Schema.Types.ObjectId;
  rating: number;
};

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

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    collection: "Bootcamps",
  }
);

export default mongoose.models.Bootcamp || mongoose.model("Bootcamp", Bootcamp);
