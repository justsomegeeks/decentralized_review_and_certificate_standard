import { create } from "ipfs-http-client";

import Block from "./models/Block";
import Bootcamp from "./models/Bootcamp";
import Review from "./models/Review";
import Course from "./models/Course";
import Graduate from "./models/Graduate";

export const IPFS = create({ url: "https://infura.io:5001" });

export const emptyDatabase = async () => {
  try {
    await Block.deleteMany({});
    await Bootcamp.deleteMany({});
    await Review.deleteMany({});
    await Course.deleteMany({});
    await Graduate.deleteMany({});
    //   TODO: Clear DATABASE
    console.log("Database has be emptied!");
  } catch {
    console.log("Couldn't delete data!");
  }
};
