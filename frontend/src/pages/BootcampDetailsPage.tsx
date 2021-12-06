import { LocationMarkerIcon } from "@heroicons/react/outline";
import { joinClasses, SERVER } from "../helpers/index";
import { useNavigate } from "react-router-dom";
import { AnnotationIcon, ShieldCheckIcon } from "@heroicons/react/solid";
import CourseCard from "../components/cards/CourseCard";
import { RatingView } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Reviews from "../components/Reviews";
import Courses from "../components/Courses";

type BootcampPropsType = {
  cid: string;
};
type BootcampInfo = {
  name: string;
  rating: number;
  ratingCount: number;
  location: string;
  about: string;
};
type RatingDetails = {
  rating: number;
  count: number;
};

const BootcampDetailsPage = () => {
  const navigate = useNavigate();
  const [bootcampInfo, setBootcampInfo] = useState<BootcampInfo>();
  const [ratingDetails, setRatingDetails] = useState<RatingDetails>();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function init() {
      const { cid } = (
        await axios.get(`${SERVER}/bootcamps/${params.bootcampAddress}`)
      ).data as BootcampPropsType;
      const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
      const _bootcampDetails = response.data as BootcampInfo;
      setBootcampInfo(_bootcampDetails);
      const ratingRes = await axios.get(
        `${SERVER}/bootcamps/${params.bootcampAddress}/ratings`
      );
      const _ratingDetails = ratingRes.data as RatingDetails;
      setRatingDetails(_ratingDetails);
    }
    init();
  }, [params]);

  const handleWriteReview = () => {
    // TODO: write review
    navigate(`${window.location.pathname}/review`);
  };
  return (
    <>
      {/* first section */}
      <section className="py-5 bg-gray-200 shadow-md ">
        <div
          className={joinClasses(
            "max-w-4xl",
            "mx-auto",
            "bg-white",
            "rounded-lg",
            "p-10"
          )}
        >
          <div className="flex items-center justify-between my-2">
            <img
              src="/images/bootcamp.jpg"
              width={150}
              height={150}
              alt="logo"
            />
            <div>
              <h1
                className={joinClasses(
                  "font-bold",
                  "text-4xl",
                  "text-gray-600"
                )}
              >
                {bootcampInfo?.name}
              </h1>
              <p className="flex text-sm">
                <LocationMarkerIcon className="h-6" />
                {bootcampInfo?.location}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleWriteReview}
              className={joinClasses(
                "py-4",
                "px-7",
                "border",
                "border-red-600",
                "rounded-md",
                "shadow-md",
                "bg-gray-200",
                "text-red-600",
                "font-semibold",
                "hover:bg-white",
                "focus:bg-red-100"
              )}
            >
              Write a Review
            </button>

            <div className="flex flex-col items-center justify-center">
              <RatingView ratingValue={ratingDetails?.rating || 0} />
              <div className="flex">
                <AnnotationIcon className="h-5" />
                <div className="text-sm">{ratingDetails?.count} reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* second section */}
      <section>
        <div className="max-w-5xl p-10 mx-auto">
          <h1 className="heading">About The Software Guild</h1>
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <LocationMarkerIcon className="h-5" />
              <p>
                <span>Location:</span>
                <span>{bootcampInfo?.location}</span>
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="flex space-x-2">
                <ShieldCheckIcon className="h-5 text-red-600" />
                <p>Available Online</p>
              </div>
              <div className="flex space-x-2">
                <ShieldCheckIcon className="h-5 text-red-600" />
                <p>Flexible Classes</p>
              </div>
            </div>
          </div>
          {/* text content box */}
          <div
            className={joinClasses(
              "p-5",
              "mt-10",
              "bg-gray-50",
              "rounded-md",
              "shadow-md"
            )}
          >
            <p>{bootcampInfo?.about}</p>
          </div>
          {/* courses */}
          <Courses bootcampAddress={params.bootcampAddress as string} />
          {/* reviews */}
          <Reviews bootcampAddress={params.bootcampAddress as string} />
        </div>
      </section>
    </>
  );
};

export default BootcampDetailsPage;
