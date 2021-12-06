import Bootcamp from "../models/Bootcamp";
import Course from "../models/Course";
import { create } from "ipfs-http-client";

const IPFS = create({ url: "https://infura.io:5001" });

export default async function handleNewCourse(
  courseAddress: string,
  courseCID: string,
  bootcampAddress: string
) {
  const bootcamp = await Bootcamp.findOne({ address: bootcampAddress });
  if (bootcamp) {
    try {
      bootcampAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const course = await Course.create({
        address: courseAddress,
        cid: courseCID,
        bootcamp: bootcamp,
      });
      await Bootcamp.findOneAndUpdate(
        { address: bootcampAddress },
        { $push: { courses: course } },
        { new: true, upsert: true }
      );
    } catch (err) {
      console.log("DB error");
      console.log(err);
    }
  } else {
    throw new Error("Bootcamp not found");
  }
}
