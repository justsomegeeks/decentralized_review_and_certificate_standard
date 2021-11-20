import { joinClasses } from "../../helpers";

type CoursesCardPropsType = {
  name: string;
  duration: string;
  price: string;
};
const CourseCard = ({ name, duration, price }: CoursesCardPropsType) => {
  const handleCardClick = () => {
    // your  logic
  };
  return (
    <div
      onClick={handleCardClick}
      className={joinClasses(
        "grid ",
        "grid-cols-3 ",
        "mb-10",
        "cursor-pointer",
        "bg-gray-100",
        "rounded-sm ",
        "p-7",
        "hover:bg-white",
        "transition ",
        "delay-150",
        "ease-out"
      )}
    >
      <p>
        Name:
        <span className="course-card-data">{name}</span>"
      </p>
      <p>
        Duration: <span className="course-card-data">{duration}</span>
      </p>
      <p>
        Price: <span className="course-card-data">{price}</span>
      </p>
    </div>
  );
};

export default CourseCard;
