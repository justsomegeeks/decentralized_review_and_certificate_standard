import React, { useState } from "react";

import { useNavigate } from ".pnpm/react-router@6.0.2_react@17.0.2/node_modules/react-router";
import CircularLoader from "../components/CircularLoader";
import { useMessage } from "../context/MessageContext";
import { joinClasses } from "../helpers";
import Button from "../components/Button";
import { useBootcamp } from "../context/BootcampContext";

const NewBootcampPage = () => {
  const navigate = useNavigate();
  const [showOtherFormFields, setShowOtherFormField] = useState(false);
  const { setGlobalMessage } = useMessage();
  const { txPending, createBootcamp, bootcampAddress } = useBootcamp();

  const [userInputData, setUserInputData] = useState({
    nameOfBootcamp: "",
    location: "",
    cost: "",
    duration: "",
    nameOfCourse: "",
    descriptionOfCourse: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setUserInputData({
      ...userInputData,
      [name]: value,
    });
  };

  const handleCreateBootcamp = async () => {
    if (createBootcamp) {
      await createBootcamp(
        userInputData.nameOfBootcamp,
        userInputData.location
      );
      setGlobalMessage({
        message: `Bootcamp ${bootcampAddress} has been created successfullly`,
        type: "success",
      });

      navigate("/newBootcamp/id");

      setShowOtherFormField(true);

      // alert(JSON.stringify(userInputData));
      setUserInputData({
        nameOfBootcamp: "",
        location: "",
        cost: "",
        duration: "",
        nameOfCourse: "",
        descriptionOfCourse: "",
      });
      // your logic
    }
  };
  const handleCreateCourse = () => {
    navigate("/");
    setGlobalMessage({
      message: `course with address ${bootcampAddress} created successfullly`,
      type: "success",
    });
    setTimeout(() => {
      setGlobalMessage({});
    }, 5000);
    // your logic
  };

  return (
    <div className="min-w-full p-5">
      <div
        className={joinClasses(
          "max-w-4xl",
          "mx-auto",
          "bg-gray-100",
          "rounded-md",
          "p-5",
          "mt-4"
        )}
      >
        {!showOtherFormFields ? (
          <>
            <h1 className="text-2xl text-center">Create New Bootcamp</h1>
            <div className="flex flex-col mb-5 space-y-3 ">
              <label htmlFor="name">Name</label>
              <input
                name="nameOfBootcamp"
                onChange={handleInputChange}
                value={userInputData.nameOfBootcamp}
                type="text"
                className="w-full px-5 py-3 border rounded-md "
                placeholder="Name of Bootcamp"
              />
            </div>

            <div className="flex flex-col mb-5 space-y-3">
              <label htmlFor="name">Location</label>
              <input
                name="location"
                onChange={handleInputChange}
                value={userInputData.location}
                type="text"
                className="px-5 py-3 border rounded-md "
                placeholder="Location"
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="w-full"
                color="primary"
                onClick={handleCreateBootcamp}
              >
                {txPending ? <CircularLoader /> : "Create"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl text-center"> Create New Course</h1>{" "}
            <div className="flex flex-col mb-5 space-y-3">
              <label htmlFor="name">Name of the Course</label>
              <input
                name="nameOfCourse"
                onChange={handleInputChange}
                value={userInputData.nameOfCourse}
                type="text"
                className="px-5 py-3 border rounded-md "
                placeholder="Name of Bootcamp"
              />
            </div>
            <div className="flex flex-col mb-5 space-y-3">
              <label htmlFor="name">Cost in dollars</label>
              <input
                type="text"
                onChange={handleInputChange}
                name="cost"
                value={userInputData.cost}
                className="px-5 py-3 border rounded-md "
                placeholder="cost"
              />
            </div>
            <div className="flex flex-col mb-5 space-y-3">
              <label htmlFor="name">Duration</label>
              <input
                type="text"
                onChange={handleInputChange}
                name="duration"
                value={userInputData.duration}
                className="px-5 py-3 border rounded-md "
                placeholder="Duration"
              />
            </div>
            <div>
              <label htmlFor="description"> Description</label>
              <br />
              <textarea
                onChange={handleInputChange}
                name="descriptionOfCourse"
                value={userInputData.descriptionOfCourse}
                cols={80}
                rows={10}
                className="px-5 py-3 border rounded-md "
                placeholder="Course description"
              ></textarea>
            </div>
            <div>
              <p className="text-xs font-thin ">
                <span className="font-normal text-red-700">
                  {" "}
                  Important Note:
                </span>{" "}
                This is the unique remote address of your bootcamp. click to
                copy and paste somewhere, if you lose it then you will not be
                able to access your bootcamp
              </p>
              <p
                className={joinClasses(
                  "text-sm",
                  "p-1",
                  "w-min",
                  "cursor-pointer",
                  "hover:text-gray-700"
                )}
                onClick={() => {
                  navigator.clipboard.writeText(bootcampAddress);
                }}
              >
                {bootcampAddress}
              </p>
            </div>
            <div className="flex justify-center">
              <Button color="primary" onClick={handleCreateCourse}>
                Add
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewBootcampPage;
