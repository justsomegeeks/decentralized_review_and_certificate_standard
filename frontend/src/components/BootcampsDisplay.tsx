import BootcampCard from "./cards/BootcampCard";

import uniqId from "uniqid";
import { demoBootcamps } from "../demoData";
import { joinClasses } from "../helpers";
const BootcampsDisplay = () => {
  return (
    <div className="max-w-5xl m-10 mx-auto">
      <h1
        className={joinClasses(
          "text-center",
          "text-4xl",
          "font-bold",
          "pb-8",
          "text-gray-700",
          "tracking-wider"
        )}
      >
        Featured Schools and Bootcamps
      </h1>
      <div
        className={joinClasses(
          "grid",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4"
        )}
      >
        {demoBootcamps.map(
          ({ name, stars, mode, subjects, bootcampAddress }) => (
            <BootcampCard
              key={uniqId()}
              name={name}
              stars={stars}
              mode={mode}
              subjects={subjects}
              bootcampAddress={bootcampAddress}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BootcampsDisplay;
