import { useNavigate } from ".pnpm/react-router@6.0.2_react@17.0.2/node_modules/react-router";
import React, { useState } from "react";
import { useMessage } from "../context/MessageContext";
import { joinClasses } from "../helpers";

const NewCoursePage = () => {
  const navigate = useNavigate();
  const { setGlobalMessage } = useMessage();
  const [userInputData, setUserInputData] = useState({
    nameOfCourse: "",
    bootcampAddress: "",
    cost: "",
    duration: "",
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
  const handleCreateCourse = () => {
    // TODO: Add course data to IPFS
    // call bootcampContract.createCourse with required parameters
    // set global pending to true
    // wait for transaction to complete

    setUserInputData({
      nameOfCourse: "",
      bootcampAddress: "",
      cost: "",
      duration: "",
      descriptionOfCourse: "",
    });
    navigate("/");
    setGlobalMessage({
      message: `course created successfullly`,
      type: "success",
    });
    setTimeout(() => {
      setGlobalMessage({});
    }, 5000);
  };
  return (
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
      <h1 className="modal-heading "> Add New Course</h1>
      <div className="">
        <div className="flex flex-col mb-5 space-y-3">
          <label htmlFor="name">Bootcamp Address</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="bootcampAddress"
            value={userInputData.bootcampAddress}
            className="px-5 py-3 border rounded-md "
            placeholder="Bootcamp Address"
          />
        </div>
        <div className="flex flex-col mb-5 space-y-3">
          <label htmlFor="name">Name of the Course</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="nameOfCourse"
            value={userInputData.nameOfCourse}
            className="px-5 py-3 border rounded-md "
            placeholder="Name of Course"
          />
        </div>
        <div className="flex flex-col mb-5 space-y-3">
          <label htmlFor="name">Cost</label>
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
            name="descriptionOfCourse"
            value={userInputData.descriptionOfCourse}
            onChange={handleInputChange}
            cols={80}
            rows={10}
            className="w-full p-5 border rounded-md"
            placeholder="Course description"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button onClick={handleCreateCourse} className="button">
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCoursePage;
