import Axios from "axios";
import { useEffect, useState } from "react";
type Bootcamp = {
  cid: string;
  bootcampAddress: string;
  about: string;
  location: string;
  name: string;
};
export const useBootcamps = (): Bootcamp[] => {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  useEffect(() => {
    async function init() {
      const response = await Axios.get("http://localhost:4000/bootcamps");
      const _bootcamps = response.data as Bootcamp[];
      const bootcampsWithDetails = [];
      for (let bootcamp of _bootcamps) {
        const res = await Axios.get(`https://ipfs.io/ipfs/${bootcamp.cid}`);
        bootcampsWithDetails.push(res.data);
      }
      setBootcamps(bootcampsWithDetails);
    }
    init();
  }, []);
  return bootcamps;
};
