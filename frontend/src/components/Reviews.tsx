import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../helpers";
import ReviewCard from "./cards/ReviewCard";

type ReviewsProps = {
  bootcampAddress: string;
};
type ReviewType = {
  cid: string;
  reviewer: string;
  overallRating: number;
  createdAt: string;
  updatedAt: string;
};

export default function Reviews({ bootcampAddress }: ReviewsProps) {
  const [reviews, setReviews] = useState<ReviewType[]>();
  useEffect(() => {
    async function init() {
      const _reviews = (
        await axios.get(`${SERVER}/bootcamps/${bootcampAddress}/reviews`)
      ).data as ReviewType[];

      setReviews(_reviews);
    }
    init();
  }, [bootcampAddress]);
  return (
    <section className="max-w-5xl py-10 mx-auto ">
      <h1 className="heading">Students Reviews</h1>
      {reviews ? (
        <div className="grid grid-cols-2 gap-5 ">
          {reviews?.map((review) => (
            <ReviewCard {...review} />
          ))}
        </div>
      ) : (
        <h1>Bootcamp dont have any reviews</h1>
      )}
    </section>
  );
}
