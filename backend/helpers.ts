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
    await Block.deleteMany({});
    await Bootcamp.deleteMany({});
    await Review.deleteMany({});
    await Course.deleteMany({});
    await Graduate.deleteMany({});
    console.log("Database has been emptied!", "\n");
  } catch {
    console.log("Couldn't delete data!", "\n");
  }
};

export const handleNewBootcamp = async (
  newBootcampAddress: string,
  newBootcampCID: string
) => {
  await Bootcamp.create({
    cid: newBootcampCID,
    address: newBootcampAddress,
  });
};

export const handleNewReview = async (
  courseAddress: string,
  reiewer: string,
  reviewURI: string,
  rating: number
) => {
  // TODO: Fetch Details from CID

  try {
    const review = await Review.create({
      cid: reviewURI,
      reviewer: reiewer,
      overallRating: rating,
    });
    await Course.findOneAndUpdate(
      { address: courseAddress },
      { $push: { reviews: review } },
      { new: true, upsert: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const handleGraduate = async (
  root: string,
  courseCID: string,
  courseAddress: string
) => {
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
      // Update course graduations details
      // await Course.findOneAndUpdate(
      //   { address: course },
      //   { $push: { graduations: graduation } },
      // );
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

export const handleNewCourse = async (
  courseAddress: string,
  courseCID: string,
  bootcampAddress: string
) => {
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
