// import ethers from "ethers";
import { create } from "ipfs-http-client";

import Block from "./models/Block";
import Bootcamp from "./models/Bootcamp";
import Review from "./models/Review";
import Course from "./models/Course";
import Graduate from "./models/Graduate";

const IPFS = create({ url: "https://infura.io:5001" });

export const emptyDatabase = async () => {
  try {
    //   TODO: Clear DATABASE
    console.log("Database has be emptied!");
  } catch {
    console.log("Couldn't delete data!");
  }
};

type BootcampProps = {
  bootcampAddress: string;
  name: string;
  location: string;
};

export const handleNewBootcamp = async (
  newBootcampAddress :string,
  newBootcampCID: string
) => {
  const bootcampData = await IPFS.get(newBootcampCID);
  const bootcamp = Bootcamp.create( {
    cid: newBootcampAddress,

  })
};

type ReviewProps = {
  bootcampAddress: string;
  courseAddress: string;
  reviewer: string;
  reviewCID: string;
  rating: number;
};
export const handleNewReview = async (
  course: string,
  reiewer: string,
  reviewURI: string,
  rating: number,
  bootcampAddress: string
) => {
  // TODO: Fetch Details from CID

  try {
    const review = await Review.create({
      cid: reviewURI,
      reviewer: reiewer,
      overallRating: rating,
    });
    await Bootcamp.findOneAndUpdate(
      { address: bootcampAddress },
      { $push: { reviews: review } },
      { new: true, upsert: true }
    );
  } catch (err) {
    console.log(err);
  }
};

type GraduateProps = {
  bootcampAddress: string;
  courseAddress: string;
  proof: string;
  graduationCID: string;
};

export const handleGraduate = async (
  proof: string,
  courseCID: string,
  bootcampAddress: string,
  courseAddress: string
) => {
  // TODO: Add Graduation details to database
  const bootcamp = await Bootcamp.findOne({ address: bootcampAddress });
  const course = await Course.findOne({ address: courseAddress });
  if (bootcamp && course) {
    try {
      // Save graduation details
      const graduation = await Graduate.create({
        cid: courseCID,
        address: courseAddress,
        proof,
        bootcamp: bootcampAddress,
      });

      // Update course graduations details
      await Course.findOneAndUpdate(
        { bootcamp, address: course },
        { $push: { graduations: graduation } },
        { upsert: true, new: true }
      );
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

type CourseProps = {
  courseAddress: string;
  courseCID: string;
  bootcampAddress: string;
};

export const handleNewCourse = async (
  courseAddress: string,
  courseCID: string,
  bootcampAddress: string
) => {
  const bootcamp = await Bootcamp.findOne({ address: bootcampAddress });
  if (bootcamp) {
    try {
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
};

export const updateBlock = async (blockNumber: number) => {
  try {
    //   Checking if we are running server for the first time
    // TODO: Update Block Number with your deployed address block
    if (blockNumber === 16947958) {
      await Block.create({ name: "LastRecorded", number: blockNumber });
    } else {
      await Block.findOneAndUpdate(
        { name: "LastRecorded", $expr: { $gt: [blockNumber, "$number"] } },
        { number: blockNumber },
        { new: true }
      );
      console.log("Updated Block Number");
    }
  } catch (err) {
    console.log(err);
    console.log("Unable to create or update!");
  }
};
