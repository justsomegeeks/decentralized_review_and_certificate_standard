import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { Course } from "../../types/Course";
import { abi as courseABI } from "../../abis/Course.json";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import deployedAddresses from "../../helpers/deployedAddress.json";

interface CourseState {
  graduate?: (hash: string, cid: string) => void;
  setCourseAddress?: React.Dispatch<React.SetStateAction<string>>;
}
const initialState: CourseState = {};

const CourseContext = React.createContext<CourseState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const CourseProvider = ({ children }: ProviderProps) => {
  const { walletAddress } = useWallet();
  const [contract, setContract] = React.useState<Course>();
  const [courseAddress, setCourseAddress] = React.useState(
    deployedAddresses.Course
  );

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        courseAddress,
        courseABI,
        signer
      ) as unknown as Course;
      setContract(_contract);
    }
    if (walletAddress) {
      init();
    }
  }, [walletAddress, courseAddress]);

  async function graduate() {
    if (contract) {
    }
  }
  if (contract) {
    contract.on("Graduate", () => {
      // TODO: update state
    });
  }

  return (
    <CourseContext.Provider
      value={{
        graduate,
        setCourseAddress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => React.useContext(CourseContext);
