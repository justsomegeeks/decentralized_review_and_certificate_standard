import { ethers } from "ethers";
import mongoose from "mongoose";
import { config } from "dotenv";
import { Bootcamp, Course } from "../typechain";

// ARTIFACTS
import courseArtifact from "../artifacts/contracts/Course.sol/Course.json";
import bootcampArtifact from "../artifacts/contracts/Bootcamp.sol/Bootcamp.json";
import reviewArtifact from "../artifacts/contracts/Review.sol/Review.json";
import deployedAddresses from "../frontend/src/helpers/deployedAddress.json";

// HELPERS
import handleGraduate from './helpers/handleGraduate'
import handleNewBootcamp from './helpers/handleNewBootcamp'
import handleNewCourse from './helpers/handleNewCourse'
import handleNewReview from './helpers/handleNewReview'
import handleUpdateBlock from "./helpers/handleUpdateBlock";

config();

const provider = new ethers.providers.WebSocketProvider("http://localhost:8545/");

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
  mongoose.connect(`${process.env.MONGO_URI}`);
  mongoose.connection.on('open', async () => {
    console.log("Database connected successfuly");
    mongoose.connection.db.dropDatabase();

    // const currentBlockNumber = await provider.getBlockNumber();

    reviewContract.on("NewBootcamp", async (bootcampAddress) => {
      console.log("EVENT: New Bootcamp created on review contract");
      const newBootcamp = new ethers.Contract(
        bootcampAddress,
        bootcampArtifact.abi,
        provider
      ) as unknown as Bootcamp;
      const newBootCampCID = await newBootcamp.cid();
      await handleNewBootcamp(newBootcamp.address, newBootCampCID);
      console.log(`NewBootcamp => \n\tbootcamp address:  ${bootcampAddress}`);
    });

    bootcampContract.on(
      "CourseCreated",
      async (courseAddress, courseCID, bootcampAddress) => {
        console.log("EVENT: New course created on bootcamp Implementation contract");
        await handleNewCourse(courseAddress, courseCID, bootcampAddress);
        console.log(
          `CourseCreated => \n\tCourseAddress: ${courseAddress}, \n\tCourseId: ${courseCID}, \n\tBootcampId: ${bootcampAddress}`
        );
      }
    );

    courseContract.on(
      "Graduate",
      async (merkelProof, courseCID) => {
        console.log("EVENT: New Graduates created on course contract");
        await handleGraduate(merkelProof, courseCID, courseContract.address);
        console.log(
          `NewGraduate => \n\tMerkleProof: ${merkelProof}, \n\tCourseId: ${courseCID}`
        );
    });

    reviewContract.on(
      "NewReview",
      async (courseAddress, reviewer, reviewURI, rating) => {
        console.log("EVENT: New Review created on review contract");
        await handleNewReview(courseAddress, reviewer, reviewURI, rating);
        console.log(
          `New Review => \n\tCourseAddress: ${courseAddress}, \n\tReviewer: ${reviewer}, \n\tRewviewUri: ${reviewURI}, \n\tRating: ${rating}`
        );
      }
    );
  });

})();
