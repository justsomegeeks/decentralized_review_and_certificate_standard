import axios from "axios";
import { useEffect, useState } from "react";
import { joinClasses } from "../../helpers";

type CourseDetailsType = {
  name: string;
  cost: string;
  duration: string;
};
type CourseCardProps = {
  cid: string;
  address: string;
};

const CourseCard = ({ cid }: CourseCardProps) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetailsType>();
  const handleCardClick = () => {
    // your  logic
  };
  useEffect(() => {
    // TODO: FetchCid and populate details
    async function init() {
      const res = await axios.get(`https://ipfs.io/ipfs/${cid}`);
      setCourseDetails(res.data as CourseDetailsType);
    }
    init();
  }, [cid]);
  return (
    <div
      onClick={handleCardClick}
      className={joinClasses(
        "flex",
        "justify-between",
        "p-10",
        "cursor-pointer",
        "bg-gray-100",
        "rounded-sm ",
        "hover:bg-white",
        "transition ",
        "delay-150",
        "ease-out"
      )}
    >
      {courseDetails ? (
        <>
          <div>Name: {courseDetails.name}</div>
          <div>Duration: {courseDetails.duration}</div>
          <div>Price: {courseDetails.cost}</div>
        </>
      ) : (
        "loading....."
      )}
    </div>
  );
};

export default CourseCard;
