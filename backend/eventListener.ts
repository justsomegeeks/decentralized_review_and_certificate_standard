import "@nomiclabs/hardhat-ethers";
import mongoose from "mongoose";
import { ethers } from "hardhat";
import { config } from "dotenv";

// ARTIFACTS
import courseArtifact from "../artifacts/contracts/Course.sol/Course.json";
import bootcampArtifact from "../artifacts/contracts/Bootcamp.sol/Bootcamp.json";
import reviewArtifact from "../artifacts/contracts/Review.sol/Review.json";
import deployedAddresses from "../frontend/src/helpers/deployedAddress.json";

// HELPERS
import {
  emptyDatabase,
  handleGraduate,
  handleNewBootcamp,
  handleNewCourse,
  handleNewReview,
  updateBlock,
} from "./helpers";
import { Bootcamp, Course } from "../typechain";

// MODELS
// import Bootcamp from "./models/Bootcamp";
// import Course from "./models/Course";
// import Review from "./models/Review";
// import Graduate from "./models/Graduate";
// import Block from "./models/Block";

config();

const CONSTANTS = {
  rinkeby: {
    contractAddress: "0x3185619aD5192b0f728f4874F92A630d0793E179",
    rpc: process.env.RINKEBY_URL,
  },
};
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const reviewContract = new ethers.Contract(
  deployedAddresses.Review,
  reviewArtifact.abi,
  provider
);
const bootcampContract = new ethers.Contract(
  deployedAddresses.Bootcamp,
  bootcampArtifact.abi,
  provider
);
const courseContract = new ethers.Contract(
  deployedAddresses.Course,
  courseArtifact.abi,
  provider
);

(async () => {
  await mongoose.connect(process.env.MONGO_URI as string, {}, () => {
    console.log("Database connected successfuly");
  });
  //TODO:  Remove this on prod.
  await emptyDatabase();

  console.log("DB connected successfully from Event Listener");
  // const currentBlockNumber = await provider.getBlockNumber();

  bootcampContract.on("CourseCreated", (courseAddress, courseCID, bootcampAddress) => {
    handleNewCourse(courseAddress, courseCID, bootcampAddress);
    console.log(`CourseCreated: ${courseAddress} ${courseCID} ${bootcampAddress}`);
  });
  //
  courseContract.on("Graduate", (merkelProof, courseCID) => {
    handleGraduate(merkelProof, courseCID, courseContract.owner(), courseContract.address);
    console.log(`NewGraduate: ${merkelProof} ${courseCID}`);
  });

  reviewContract.on("NewBootcamp", async (bootcampAddress) => {
    const newBootcamp = await ethers.getContractAt('Bootcamp', bootcampAddress) as unknown as Bootcamp
    const newBootCampCID = await newBootcamp.cid();

    handleNewBootcamp(bootcampAddress, newBootCampCID);
    console.log(`NewBootcamp:  ${bootcampAddress}`);
  });

  reviewContract.on(
    "NewReview",
    async (course, reviewer, reviewURI, rating) => {
      const reviewCourseContract = await ethers.getContractAt('Course', course) as unknown as Course;
      const bootcampAddress = await reviewCourseContract.owner();
      handleNewReview(course, reviewer, reviewURI, rating, bootcampAddress);
      console.log(`New Review: ${course} ${reviewer} ${reviewURI} ${rating}`);
    }
  );

  // let recordedBlock = await Block.findOne({
  //   name: "LastRecorded",
  // });

  // if (!recordedBlock) {
  //   await updateBlock(16947958);
  //   console.log("Genesis Block Number Saved");

  //   // Update recorded block
  //   recordedBlock = await Block.findOne({
  //     name: "LastRecorded",
  //   });
  // }

  // TODO: Avoiding this for hackathon

  // if (recordedBlock.number < currentBlockNumber) {
  //   // make all query filter calls at same time
  //   const newBootcampFilter = reviewContract.filters.NewBootcamp();
  //   const getRegisteredBootcamps = bootcampContract.queryFilter(
  //     newBootcampFilter,
  //     recordedBlock.number
  //   );

  //   const newGraduateFilter = courseContract.filters.Graduate();
  //   const getGraduations = courseContract.queryFilter(
  //     newGraduateFilter,
  //     recordedBlock.number
  //   );

  //   const newCourseFilter = reviewContract.filters.NewCourse();
  //   const getCourses = reviewContract.queryFilter(
  //     newCourseFilter,
  //     recordedBlock.number
  //   );

  //   const newReviewFilter = reviewContract.filters.NewReview();
  //   const getReviews = reviewContract.queryFilter(
  //     newReviewFilter,
  //     recordedBlock.number
  //   );

  //   // await later so that you don't miss blocks.
  //   const bootcamps = await getRegisteredBootcamps;
  //   const graduations = await getGraduations;
  //   const courses = await getCourses;
  //   const reviews = await getReviews;
  // }

  // BEYOND THE SCOPE OF THIS HACKATHON
  // TODO: Add functionality to record multiple courses in a bootcamp
  //bootcampContract.on("CourseCreated", handleNewCourse);

  // BEYOND THE SCOPE OF THIS HACKATHON
  // TODO: how to record when graduations is done in multiple courses?
  //courseContract.on("Graduate", handleGraduate);
})();
