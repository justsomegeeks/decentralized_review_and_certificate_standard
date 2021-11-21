import { StarIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { RatingView } from "react-simple-star-rating";
import uniqId from "uniqid";
import { joinClasses } from "../../helpers";
type BootcampCardPropsType = {
  name: string;
  mode: string;
  stars: number;
  subjects: string;
  bootcampAddress: string;
};
const BootcampCard = ({
  name,
  mode,
  stars,
  subjects,
  bootcampAddress,
}: BootcampCardPropsType) => {
  const navigate = useNavigate();
  // TODO: cid = props
  // Axios.get(ipfs.io/ipfs/cid)
  return (
    <div
      onClick={() => navigate(`/bootcamp/${bootcampAddress}`)}
      className={joinClasses(
        "bg-gray-100",
        "shadow-md",
        "space-y-2",
        "m-4",
        "cursor-pointer",
        "flex",
        "flex-col",
        "items-center ",
        "p-10",
        "rounded-md",
        "hover:bg-gray-200"
      )}
    >
      <img src="/images/flyer.png" alt="name" className="w-16 h-16" />
      <span
        className={joinClasses(
          "text-lg",
          "font-semibold",
          "tracking-wide",
          "text-blue-700",
          "hover:underline"
        )}
      >
        {name}
      </span>
      <RatingView ratingValue={5} stars={5} />
      <p
        className={joinClasses(
          "font-extralight",
          "text-black",
          "leading-4",
          "text-sm",
          "text-center"
        )}
      >
        {subjects}
      </p>
      <p className="font-light">{mode}</p>
    </div>
  );
};

export default BootcampCard;
