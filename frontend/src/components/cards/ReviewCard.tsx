import { joinClasses } from "../../helpers";
import ReviewDescription from "../ReviewDescription";
import { RatingView } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import axios from "axios";

type ReviewCardPropsType = {
  cid: string;
  reviewer: string;
  overallRating: number;
  createdAt: string;
  updatedAt: string;
};

type ReviewType = {
  reviewer: string;
  email: string;
  title: string;
  body: string;
  rating: number;
  batch: string;
  course: string;
};
const ReviewCard = ({ cid, createdAt }: ReviewCardPropsType) => {
  const [review, setReview] = useState<ReviewType>();
  useEffect(() => {
    async function init() {
      // TODO: Fetch Cid and set review
      const _review = (await axios.get(`https://ipfs.io/ipfs/${cid}`))
        .data as ReviewType;
      setReview(_review);
    }
    init();
  }, [cid]);
  return (
    <div className={joinClasses("bg-gray-50", "p-5", "space-y-5", "shadow-lg")}>
      {review ? (
        <>
          <div className="mb-4 border-b border-gray-200">
            <div className="flex justify-between ">
              <h1 className="font-semibold text-gray-800">{review.reviewer}</h1>
            </div>
            <p>
              <span className="text-sm font-light">{createdAt}</span>
            </p>
          </div>
          <div className="border-b border-gray-200 ">
            <div>
              <h3 className="text-left">Rating</h3>
              <RatingView ratingValue={review.rating} stars={5} />
            </div>
          </div>
          <h2
            className={joinClasses("font-semibold", "text-lg", "text-gray-800")}
          >
            {review.title}
          </h2>
          <ReviewDescription reviewDescription={review.body} />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default ReviewCard;
