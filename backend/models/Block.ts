import mongoose from "mongoose";

const Block = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    number: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Block || mongoose.model("Block", Block);
