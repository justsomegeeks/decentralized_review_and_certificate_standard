import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";

import { Modal } from "react-responsive-modal";
import { joinClasses } from "../../helpers";
import { useNavigate } from "react-router-dom";
type PopUpPropsTypes = {
  showBootcampModal: boolean;
  setShowBootcampModal: Dispatch<SetStateAction<boolean>>;
};
// this popup is rendered at bottom of navbar.tsx
const BootcampModal = ({
  showBootcampModal,
  setShowBootcampModal,
}: PopUpPropsTypes) => {
  const navigate = useNavigate();
  // handle yes or no
  const [ownBootcamp, setOwnBootcamp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnBootcamp(e.target.value);
  };

  const handleSubmit = () => {
    setShowBootcampModal(false);
    ownBootcamp === "yes" ? navigate("/newCourse") : navigate("/newBootcamp");
  };
  // handle open and close modal/popup
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(showBootcampModal);
  }, [setOpen, showBootcampModal]);
  const onCloseModal = () => {
    setShowBootcampModal(false);
  };
  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="w-full p-16">
          <p className="mb-5 font-mono text-lg font-semibold">
            Do you own a bootcamp contract address?
          </p>
          <select
            name="bootcamp"
            id="bootcamp"
            onChange={handleChange}
            className="select"
          >
            <option value=""> --select-- </option>
            <option value="yes">Yes </option>
            <option value="no"> No </option>
          </select>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={joinClasses(
              "float-right",
              "py-2",
              "px-4",
              "rounded",
              "text-blue-600",
              "hover:bg-blue-600",
              "hover:text-white"
            )}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};
export default BootcampModal;
