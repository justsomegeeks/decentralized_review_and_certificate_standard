import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { joinClasses } from "../helpers";
import { useReview } from "../context/ReviewContext";
const ReviewPage = () => {
  const [reviewer, setReviewer] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [batch] = useState("Dec 2021");
  const [course] = useState("Solidity Developer");
  const { txPending, reviewCourse } = useReview();
  const handleFormSubmit = async () => {
    if (reviewCourse) {
      reviewCourse({
        batch,
        course,
        reviewer,
        email,
        title,
        body,
        rating,
      });
    }
  };
  return (
    <>
      <div className="max-w-5xl mx-auto mb-5">
        <h1
          className={joinClasses(
            "text-lg",
            "text-center",
            "p-10",
            "bg-gray-100",
            "mt-3",
            "rounded"
          )}
        >
          {" "}
          <span className="text-xl font-bold text-gray-700 ">
            Your review matters!
          </span>{" "}
          Honest feedback on bootcamps will help us build new money legos that
          will redefine how skill markets work now.
        </h1>
        <div className="p-10 mt-10 bg-gray-100 border rounded">
          <div className="flex justify-between">
            <div>
              <label htmlFor="name"> Full Name</label>
              <br />
              <input
                onChange={(e) => setReviewer(e.target.value)}
                name="name"
                value={reviewer}
                type="text"
                className="inputField"
                placeholder="name"
              />
            </div>
            <div>
              <label htmlFor="email"> Email</label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                className="inputField"
                placeholder="email"
              />
            </div>
          </div>
          <div className="mt-5 ">
            <label htmlFor="reviewTitle">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name="title"
              className="w-full inputField "
              type="text"
              placeholder="Describe your experience in one sentence"
            />
          </div>
          <div className="my-5">
            <label htmlFor="" className="block float-left ">
              Review
            </label>
            <br />
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="w-full p-5 border-2 border-gray-300"
              placeholder="What are the pros and cons of attending this bootcap? Share your story"
            ></textarea>
          </div>
          <div className="">
            <h1 className="pb-4">How would you rate your expierence</h1>
            <div className="">
              <Rating
                ratingValue={rating}
                stars={5}
                onClick={(value) => setRating(value)}
              />
            </div>
          </div>
          {/* school,location and course input */}
          <div className="flex justify-between mt-10">
            <div className="space-x-4">
              {/* TODO: update this */}
              Bootcamp: Chainshot
            </div>
            <div className="space-x-4">
              {/* TODO: update this */}
              Course: {course}
            </div>
            {/* TODO: update this */}
            <div className="space-x-4">Batch: {batch}</div>
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={handleFormSubmit}
              className={joinClasses(
                "py-3",
                "px-10",
                "border",
                "border-red-600",
                "rounded-md",
                "shadow-md",
                "bg-gray-200",
                "text-red-600",
                "font-semibold",
                "hover:bg-white",
                "focus:bg-red-100 "
              )}
            >
              {txPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
