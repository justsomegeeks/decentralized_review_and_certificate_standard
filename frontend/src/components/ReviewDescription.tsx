import { useState } from "react";
import { joinClasses } from "../helpers";
type ReviewDescriptionType = {
  reviewDescription: string;
};
const ReviewDescription = ({ reviewDescription }: ReviewDescriptionType) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div>
      <p>
        {isReadMore ? reviewDescription.slice(0, 150) : reviewDescription}
        <span
          className={joinClasses(
            "text-blue-600",
            "cursor-pointer",
            "hover:underline"
          )}
          onClick={toggleReadMore}
        >
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    </div>
  );
};

export default ReviewDescription;
