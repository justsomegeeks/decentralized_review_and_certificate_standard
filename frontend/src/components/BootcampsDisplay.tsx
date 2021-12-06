import { useEffect, useState } from "react";
import uniqId from "uniqid";
import axios from "axios";

import BootcampCard from "./cards/BootcampCard";
import { joinClasses, SERVER } from "../helpers";

const BootcampsDisplay = () => {
  const [bootcamps, setBootcamps] = useState<any[]>([]);
  useEffect(() => {
    async function init() {
      const res = await axios.get(SERVER + "/bootcamps");
      console.log(res.data);
      const _bootcamps = new Array(4).fill(res.data[0]);
      setBootcamps(_bootcamps);
    }
    init();
  }, []);
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
        {bootcamps.map(({ bootcampAddress, cid }) => (
          <BootcampCard
            key={uniqId()}
            cid={cid}
            bootcampAddress={bootcampAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default BootcampsDisplay;
