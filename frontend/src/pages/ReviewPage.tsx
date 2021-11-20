import { useState } from "react";
import { Rating, RatingView } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { joinClasses } from "../helpers";
const ReviewPage = () => {
  const navigate = useNavigate();
  const { setGlobalMessage } = useMessage();
  const [reviewFormInput, setReviewFormInput] = useState<any>({
    fullName: "",
    email: "",
    profession: "",
    reviewTitle: "",
    reviewDescription: "",
    rating: 0,
    school: "",
    course: "",
    finishYear: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = e.target;

    setReviewFormInput({
      ...reviewFormInput,
      [name]: value,
    });
  };
  const handleRating = (rating: number) => {
    console.log(rating);
    setReviewFormInput({
      ...reviewFormInput,
      rating,
    });
  };
  const handleFormSubmit = () => {
    setReviewFormInput({
      fullName: "",
      email: "",
      profession: "",
      reviewTitle: "",
      reviewDescription: "",
      rating: 0,
      school: "",
      course: "",
      finishYear: "",
    });
    navigate(-1);
    setGlobalMessage({
      message: "Your review has been submitted succesfully",
      type: "success",
    });
    setTimeout(() => {
      setGlobalMessage({});
    }, 5000);
    // TODO: push routes to the bootcamps/bootcampAddress page
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
            "mt-3"
          )}
        >
          {" "}
          <span className="text-xl font-bold text-gray-700 ">
            Your review matters!
          </span>{" "}
          Honest feedback on bootcamps will help us build new money legos that
          will redefine how skill markets work now.
        </h1>
        <div className="p-10 mt-10 bg-gray-100 border">
          <div className="flex gap-4 ">
            <div>
              <label htmlFor="j"> Full Name</label>
              <input
                onChange={handleInputChange}
                name="fullName"
                value={reviewFormInput.fullName}
                type="text"
                className="inputField"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label htmlFor="email"> Email</label>
              <input
                onChange={handleInputChange}
                value={reviewFormInput.email}
                name="email"
                type="email"
                className="inputField"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label htmlFor="profession"> Profession</label>
              <input
                onChange={handleInputChange}
                value={reviewFormInput.profession}
                name="profession"
                type="text"
                className="inputField"
                placeholder="e.g Software Engineer,Designer etc"
              />
            </div>
          </div>
          <div className="mt-5 ">
            <label htmlFor="reviewTitle">Review Title</label>
            <input
              onChange={handleInputChange}
              value={reviewFormInput.reviewTitle}
              name="reviewTitle"
              className="w-full inputField "
              type="text"
              placeholder="In one sentense, describe your experience"
            />
          </div>
          <div className="my-5">
            <label htmlFor="" className="block float-left ">
              Review
            </label>
            <br />
            <textarea
              name="reviewDescription"
              value={reviewFormInput.reviewDescription}
              onChange={handleInputChange}
              rows={10}
              className="w-full p-5 border-2 border-gray-300"
              placeholder="What are the pros and cons of attending this bootcap? Share your story"
            ></textarea>
          </div>
          <div className="">
            <h1 className="pb-4">How would you rate your expierence</h1>
            <div className="">
              <Rating
                ratingValue={reviewFormInput.rating}
                stars={5}
                onClick={handleRating}
              />
            </div>
          </div>
          {/* school,location and course input */}
          <div className="flex justify-between mt-10">
            <div className="space-x-4">
              <label htmlFor="">School</label>
              <input
                type="input"
                value="Vidhya Bharati"
                disabled
                name="school"
                className="select"
              />
            </div>
            <div className="space-x-4">
              <label htmlFor="">Course</label>
              <select
                className="select"
                onChange={handleInputChange}
                value={reviewFormInput.course}
                name="course"
                id=""
                placeholder="Course you did"
              >
                <option value="something">--select--</option>
                <option value="something">something</option>
                <option value="something">something</option>
                <option value="something">something</option>
                <option value="something">something</option>
              </select>
            </div>
            <div className="space-x-4">
              <label htmlFor="">Year </label>
              <select
                className="select"
                onChange={handleInputChange}
                value={reviewFormInput.finishYear}
                name="finishYear"
                id=""
              >
                <option value="none"> --select--</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>
          </div>
          {/* radio button and year of completion */}
          <div className="flex mt-10">
            {/* radio buttons*/}

            {/* year of completion */}
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
