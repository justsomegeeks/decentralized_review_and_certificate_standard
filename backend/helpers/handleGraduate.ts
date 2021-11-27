import Course from "../models/Course";
import Graduate from "../models/Graduate";
import { create } from "ipfs-http-client";

const IPFS = create({ url: "https://infura.io:5001" });

export default async function handleGraduate(
  root: string,
  courseCID: string,
  courseAddress: string
) {
  // TODO: Add Graduation details to database
  const course = await Course.findOne({ address: courseAddress });
  if (course) {
    try {
      // Save graduation details
      const graduation = await Graduate.create({
        cid: courseCID,
        address: courseAddress,
        root: root,
        bootcamp: course.bootcamp,
      });
      await course.updateOne({ $push: { graduations: graduation } });
    } catch (err) {
      console.log(err);
    }
  } else {
    if (!course) {
      console.log("Course Not found");
      throw new Error("Course Not Found");
    } else {
      console.log("Bootcamp Not found");
      throw new Error("Bootcamp Not Found");
    }
  }
};
