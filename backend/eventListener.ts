import { ethers } from "ethers";
import mongoose from "mongoose";
import { config } from "dotenv";

// ARTIFACTS
import courseArtifact from "./artifacts/Course.json";
import bootcampArtifact from "./artifacts/Bootcamp.json";
import reviewArtifact from "./artifacts/Review.json";
// import deployedAddresses from "../frontend/src/helpers/deployedAddress.json";
const deployedAddresses = {
  Greeter: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  Bootcamp: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  Review: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  Course: "0xCafac3dD18aC6c6e92c921884f9E4176737C052c",
  CourseImpl: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

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
  mongoose.connect(`${process.env.MONGO_URI}`, {}, async function () {
    console.log("Database connected successfuly");
    // const currentBlockNumber = await provider.getBlockNumber();
    await emptyDatabase();

    reviewContract.on("NewBootcamp", async (bootcampAddress) => {
      console.log("New Bootcamp created");
      const newBootcamp = new ethers.Contract(
        bootcampAddress,
        bootcampArtifact.abi,
        provider
      ) as unknown as Bootcamp;
      const newBootCampCID = await newBootcamp.cid();
      // TODO: Update Database
      handleNewBootcamp(newBootcamp.address, newBootCampCID);
      console.log(`NewBootcamp => bootcamp address:  ${bootcampAddress}`);
    });

    bootcampContract.on(
      "CourseCreated",
      (courseAddress, courseCID, bootcampAddress) => {
        handleNewCourse(courseAddress, courseCID, bootcampAddress);
        console.log(
          `CourseCreated => course addresss: ${courseAddress}, course id: ${courseCID}, bootcamp id: ${bootcampAddress}`
        );
      }
    );

    courseContract.on("Graduate", async (merkelProof, courseCID) => {
      handleGraduate(merkelProof, courseCID, courseContract.address);
      console.log(
        `NewGraduate => proof: ${merkelProof}, course Id: ${courseCID}`
      );
    });

    reviewContract.on(
      "NewReview",
      async (courseAddress, reviewer, reviewURI, rating) => {
        handleNewReview(courseAddress, reviewer, reviewURI, rating);
        console.log(
          `New Review => course address: ${courseAddress}, reviewer: ${reviewer}, rewviewUri: ${reviewURI}, rating: ${rating}`
        );
      }
    );
  });

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
