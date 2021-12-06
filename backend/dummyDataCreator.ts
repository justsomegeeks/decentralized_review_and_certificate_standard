import mongoose from "mongoose";
import { config } from "dotenv";
import { emptyDatabase } from "./helpers";
import Bootcamp from "./models/Bootcamp";
import Course from "./models/Course";
import Graduate from "./models/Graduate";
import Review from "./models/Review";

config();

(async () => {
  mongoose.connect(`${process.env.MONGO_URI}`, {}, async function () {
    console.log("Database connected successfuly");
    // const currentBlockNumber = await provider.getBlockNumber();
    await emptyDatabase();
    const bootcamp = await Bootcamp.create({
      cid: "QmXFb3YhKzL7JF29JwcNUcdwpuKwtgeRQ3N1SeM5LNpRJd",
      bootcampAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    });
    const course = await Course.create({
      cid: "QmPfrU8zkqja2ArxpgciCzzTjqWqpxtF8tUqMnvnL6ZeJ7",
      address: "0xCafac3dD18aC6c6e92c921884f9E4176737C052c",
      bootcamp: bootcamp,
    });

    const graduate = await Graduate.create({
      cid: "QmXitVjKJPKZ1wjYdhoTsDPeTrB54MeWczWiQti7XMwojJ",
      root: "0xd38a533706a576a634c618407eb607df606d62179156c0bed7ab6c2088b01de9",
      course: course,
      bootcamp: bootcamp,
    });
    const review = await Review.create({
      cid: "QmSYfmDo5NiPS3ykHBEH71Y8d5ZgBDujGQJ6icFSvUCBaQ",
      overallRating: 500,
      reviewer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      courseAddress: course.address,
    });
    await course.updateOne({
      $push: { graduations: graduate },
    });
    await bootcamp.updateOne({ $push: { courses: course, reviews: review } });
    console.log("Added dummy data to the database");
  });
})();
