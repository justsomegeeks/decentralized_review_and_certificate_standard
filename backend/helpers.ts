// import ethers from "ethers";

import Block from "./models/Block";
import Bootcamp from "./models/Bootcamp";
import Review from "./models/Review";
import Course from "./models/Course";
import Graduate from "./models/Graduate";

export const emptyDatabase = async () => {
  try {
    //   TODO: Clear DATABASE
    console.log("Database has be emptied!");
  } catch {
    console.log("Couldn't delete data!");
  }
};
export const handleNewBootcamp = async (bootcampAddress: string) => {
  // TODO: record when new course is added to review protocol
  // TODO: Fetch ipfs with cid and write it to the database for consumption
};
export const handleNewReview = async (
  courseAddress,
  reviewer,
  reviewURI,
  rating
) => {
  // TODO: record when new review is submitted
  // TODO: Fetch ipfs with cid and write it to the database for consumption
};

export const handleGraduate = async (proof: string, graduateCID: string) => {
  // TODO: record event args to database when graduation is done.
};

export const handleNewCourse = async (
  courseAddress: string,
  courseCID: string
) => {
  // TODO: record event args to database when new Course is created in a bootcamp
};

export const updateBlock = async (blockNumber) => {
  try {
    //   Checking if we are running server for the first time
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
