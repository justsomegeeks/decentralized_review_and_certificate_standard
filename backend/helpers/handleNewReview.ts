import Review from "../models/Review";
import Course from "../models/Course";
import { create } from "ipfs-http-client";

const IPFS = create({ url: "https://infura.io:5001" });

export default async function handleNewReview(
  courseAddress: string,
  reiewer: string,
  reviewURI: string,
  rating: number
) {
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
}
