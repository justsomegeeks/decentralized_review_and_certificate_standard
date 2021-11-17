import mongoose from "mongoose";

const Bootcamp = new mongoose.Schema({
  cid: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
});

export default mongoose.models.Bootcamp || mongoose.model("Bootcamp", Bootcamp);
