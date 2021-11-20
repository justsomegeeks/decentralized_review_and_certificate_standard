import uniqId from "uniqid";
import { StarIcon } from "@heroicons/react/solid";
import { joinClasses } from "../../helpers";
import ReviewDescription from "../ReviewDescription";
type ReviewCardPropsType = {
  name: string;
  completedDate: string;
  reviewDate: string;
  rating: number;
  reviewTitle: string;
  description: string;
};
const ReviewCard = ({
  name,
  completedDate,
  reviewDate,
  rating,
  reviewTitle,
  description,
}: ReviewCardPropsType) => {
  return (
    <div className={joinClasses("bg-gray-50", "p-5", "space-y-5", "shadow-lg")}>
      <div className="mb-4 border-b border-gray-200">
        <div className="flex justify-between ">
          <h1 className="font-semibold text-gray-800">{name}</h1>
          <p className="font-light ">
            date :<span>{completedDate}</span>
          </p>
        </div>
        <p>
          completed: <span className="text-sm font-light">{reviewDate}</span>
        </p>
      </div>
      <div className="border-b border-gray-200 ">
        <p>
          <h3 className="text-left">Rating</h3>
          <p className="flex text-yellow-400">
            {Array(Math.round(rating))
              .fill(1)
              .map((_, i) => (
                <StarIcon key={uniqId()} className="h-5" />
              ))}
          </p>
        </p>
        <p></p>
        <p></p>
      </div>
      <h2 className={joinClasses("font-semibold", "text-lg", "text-gray-800")}>
        {reviewTitle}
      </h2>
      ",
      <ReviewDescription reviewDescription={description} />
    </div>
  );
};

export default ReviewCard;
