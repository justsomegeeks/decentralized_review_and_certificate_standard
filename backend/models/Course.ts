import mongoose from "mongoose";
type course = {
  cid: string;
  address: string
}
const Course = new mongoose.Schema<course>({
  cid: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  }
});

export default mongoose.models.Course || mongoose.model("Course", Course);
