import { LocationMarkerIcon } from "@heroicons/react/outline";
import { joinClasses } from "../helpers/index";
import { useNavigate } from "react-router-dom";
import {
  StarIcon,
  AnnotationIcon,
  ShieldCheckIcon,
} from "@heroicons/react/solid";
import uniqId from "uniqid";
import { demoCourses, demoReviews } from "../demoData";
import ReviewCard from "../components/cards/ReviewCard";
import CourseCard from "../components/cards/CourseCard";
import { RatingView } from "react-simple-star-rating";

const BootcampDetailsPage = () => {
  const navigate = useNavigate();
  const handleWriteReview = () => {
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
          <div className="flex items-center justify-around">
            <img src="/images/Logo.png" width={150} height={150} alt="logo" />
            <div>
              <h1
                className={joinClasses(
                  "font-bold",
                  "text-4xl",
                  "text-gray-600",
                  "pb-3"
                )}
              >
                The Software Guild
              </h1>
              <p className="flex text-sm">
                <LocationMarkerIcon className="h-6" />
                online
              </p>
            </div>
          </div>

          <div className="flex items-center justify-around">
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
            <RatingView ratingValue={5} stars={5} />
            <div className="flex items-center">
              <AnnotationIcon className="h-5" />
              <p className="text-sm">102 reviews</p>
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
                <span>Online</span>
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              perferendis et quos accusantium totam laudantium illo, magnam
              reiciendis similique blanditiis ex aut, pariatur dolores minus
              odio fugiat dolorum at quia ratione doloribus tenetur fuga eos
              ipsa. Porro suscipit aliquid eaque recusandae natus
              necessitatibus, omnis a similique deleniti excepturi? Voluptate
              excepturi enim odit, officiis accusantium consectetur sapiente
              dicta nisi libero consequuntur rem cumque quos, quis nemo vitae
              voluptatibus magni error nulla omnis ea vel ipsum, neque ex? Fuga
              inventore hic blanditiis earum sapiente placeat cupiditate
              consequatur voluptatem iusto nobis, ducimus quos incidunt totam
              veritatis quasi tempore tenetur? Ex hic voluptatibus amet.
            </p>
          </div>
          {/* courses */}
          <div
            className={joinClasses(
              "p-5",
              "bg-gray-50",
              "h-80",
              "overflow-scroll",
              "scrollbar-hide"
            )}
          >
            <h1 className="heading">Courses</h1>
            {demoCourses.map(({ name, price, duration }) => (
              <CourseCard
                key={uniqId()}
                name={name}
                price={price}
                duration={duration}
              />
            ))}
          </div>
          {/* reviews */}
          <section className="max-w-5xl py-10 mx-auto ">
            <h1 className="heading">Students Reviews</h1>
            {!demoReviews ? (
              <h1>Bootcamp dont have any reviews</h1>
            ) : (
              <div className="grid grid-cols-2 gap-5 ">
                {demoReviews?.map(
                  ({
                    name,
                    completedDate,
                    reviewDate,
                    overallStar,
                    reviewTitle,
                    description,
                  }) => (
                    <ReviewCard
                      key={uniqId()}
                      name={name}
                      completedDate={completedDate}
                      reviewDate={reviewDate}
                      rating={overallStar}
                      reviewTitle={reviewTitle}
                      description={description}
                    />
                  )
                )}
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default BootcampDetailsPage;
