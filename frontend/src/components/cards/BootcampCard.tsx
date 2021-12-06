import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RatingView } from "react-simple-star-rating";
import { joinClasses } from "../../helpers";
type BootcampCardPropsType = {
  bootcampAddress: string;
  cid: string;
};
type CardData = {
  name: string;
  about: string;
  location: string;
};
const BootcampCard = ({ cid, bootcampAddress }: BootcampCardPropsType) => {
  console.log({ cid, bootcampAddress });
  const [cardData, setCardData] = useState<CardData>();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const res = await axios.get(`https://ipfs.io/ipfs/${cid}`);
      setCardData(res.data);
    }
    init();
  }, [cid]);
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
        {cardData?.name}
      </span>
      <p className="flex space-x-1 text-yellow-400">
        <RatingView ratingValue={5} />
      </p>
      <p
        className={joinClasses(
          "font-extralight",
          "text-black",
          "leading-4",
          "text-sm",
          "text-center"
        )}
      >
        {cardData?.about.slice(0, 60)}
      </p>
      <p className="font-light">{cardData?.location}</p>
    </div>
  );
};

export default BootcampCard;
