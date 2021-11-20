import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { useMessage } from "../../context/MessageContext";
import Button from "../Button";
type GraduateStudentModalPropTypes = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const GraduateStudentModal = ({
  show,
  setShow,
}: GraduateStudentModalPropTypes) => {
  const { setGlobalMessage } = useMessage();

  const onCloseModal = () => setShow(false);

  const [userInputData, setUserInputData] = useState({
    course: "",
    students: "",
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

  const handleGraduateStudents = () => {
    // TODO: Parse students data (Comma seperated values)

    // TODO: write it to IPFS

    // TODO: load up a contract and call course.graduate()

    setUserInputData({
      course: "",
      students: "",
    });

    setShow(false);
    setGlobalMessage({
      message: "students graduated successfully",
      type: "success",
    });
    setTimeout(() => {
      setGlobalMessage({});
    }, 5000);
  };

  return (
    <Modal
      open={show}
      onClose={onCloseModal}
      center
      classNames={{ modal: "w-2/3" }}
    >
      <div className="p-5 ">
        <div className="">
          <h1 className="text-2xl text-center">Graduate Students</h1>
          <div className="flex flex-col mb-5 space-y-3 ">
            <label htmlFor="name">Course</label>
            <input
              name="course"
              onChange={handleInputChange}
              value={userInputData.course}
              type="text"
              className="w-full px-5 py-3 border rounded-md "
              placeholder="Course"
            />
          </div>

          <div>
            <label htmlFor="students">Students</label>
            <br />
            <textarea
              onChange={handleInputChange}
              name="students"
              value={userInputData.students}
              cols={67}
              rows={10}
              className="px-5 py-3 border rounded-md "
              placeholder="Students"
            ></textarea>
          </div>
          <Button
            className="w-full mt-4"
            onClick={handleGraduateStudents}
            color="primary"
          >
            Graduate
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GraduateStudentModal;
