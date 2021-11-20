import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { Bootcamp } from "../../types/Bootcamp";
import { abi as bootcampABI } from "../../abis/Bootcamp.json";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import deployedAddresses from "../../helpers/deployedAddress.json";

interface BootcampState {
  createCourse?: (cid: string) => void;
  setBootcampAddress?: React.Dispatch<React.SetStateAction<string>>;
}
const initialState: BootcampState = {};

const BootcampContext = React.createContext<BootcampState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const BootcampProvider = ({ children }: ProviderProps) => {
  const { walletAddress } = useWallet();
  const [contract, setContract] = React.useState<Bootcamp>();
  const [bootcampAddress, setBootcampAddress] = React.useState(
    deployedAddresses.Bootcamp
  );

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        bootcampAddress,
        bootcampABI,
        signer
      ) as unknown as Bootcamp;
      setContract(_contract);
    }
    if (walletAddress) {
      init();
    }
  }, [walletAddress, bootcampAddress]);

  async function createCourse() {
    if (contract) {
      //
    }
  }
  if (contract) {
    contract.on("NewCourse", () => {
      // TODO: update state
    });
  }

  return (
    <BootcampContext.Provider value={{ createCourse, setBootcampAddress }}>
      {children}
    </BootcampContext.Provider>
  );
};

export const useBootcamp = () => React.useContext(BootcampContext);
