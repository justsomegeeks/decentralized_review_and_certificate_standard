import { ContractFactory, ethers } from "ethers";
import React, { ReactNode, useState } from "react";
import { Bootcamp } from "../../types/Bootcamp";
import {
  abi as bootcampABI,
  bytecode as bootcampBytecode,
} from "../../abis/Bootcamp.json";
import { getProvider, getSigner } from "../../provider";
import { useWallet } from "../WalletContext";
import deployedAddresses from "../../helpers/deployedAddress.json";
import { getIPFSHTTPClient } from "../../helpers";
import { useTransaction } from "../TransactionContext";

interface BootcampState {
  createCourse?: ({
    cost,
    name,
    description,
    duration,
  }: CourseArgs) => Promise<void>;
  setBootcampAddress?: React.Dispatch<React.SetStateAction<string>>;
  createBootcamp?: (name: string, address: string) => Promise<void>;
  txPending: boolean;
  bootcampAddress: string;
}
type CourseArgs = {
  name: string;
  cost: string;
  duration: string;
  description: string;
};
const initialState: BootcampState = {
  txPending: false,
  bootcampAddress: "",
};

const BootcampContext = React.createContext<BootcampState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const BootcampProvider = ({ children }: ProviderProps) => {
  const { setPending } = useTransaction();
  const { walletAddress } = useWallet();
  const [bootcampContract, setBootcampContract] = React.useState<Bootcamp>();
  const [bootcampAddress, setBootcampAddress] = React.useState(
    deployedAddresses.Bootcamp
  );
  const [txPending, setTxPending] = useState(false);

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        bootcampAddress,
        bootcampABI,
        signer
      ) as unknown as Bootcamp;
      setBootcampContract(_contract);
    }
    if (walletAddress) {
      init();
    }
  }, [walletAddress, bootcampAddress]);

  async function createCourse({
    name,
    cost,
    duration,
    description,
  }: CourseArgs) {
    if (bootcampContract) {
      setTxPending(true);
      const ipfs = getIPFSHTTPClient();
      const files = {
        path: "/",
        content: JSON.stringify({ name, cost, duration, description }),
      };
      const response = await ipfs.add(files);
      const tx = await bootcampContract.createCourse(response.path);
      await tx.wait();
      setPending(false);
      setTxPending(false);
    }
  }
  async function createBootcamp(name: string, location: string) {
    if (!name || !location) {
      throw new Error("Bootcamp name and address error");
    }
    setTxPending(true);
    const ipfs = getIPFSHTTPClient();
    const files = {
      path: "/",
      content: JSON.stringify({ name, location }),
    };
    const response = await ipfs.add(files);
    const signer = await getSigner();
    if (signer) {
      const bootcampFactory = new ContractFactory(
        bootcampABI,
        bootcampBytecode,
        signer
      );
      setPending(true);
      console.log(bootcampFactory);
      const _bootcampContract = (await bootcampFactory.deploy(
        deployedAddresses.CourseImpl,
        response.path
      )) as unknown as Bootcamp;
      await _bootcampContract.deployed();

      setBootcampAddress(_bootcampContract.address);
      // TODO: add bootcamp to review protocol
      setPending(false);
      setTxPending(false);
    } else {
      throw new Error("Signer Not found");
    }
  }
  if (bootcampContract) {
    bootcampContract.on("CourseCreated", (...args) => {
      // TODO: update state
      console.log(args);
    });
  }

  return (
    <BootcampContext.Provider
      value={{
        createCourse,
        setBootcampAddress,
        createBootcamp,
        txPending,
        bootcampAddress,
      }}
    >
      {children}
    </BootcampContext.Provider>
  );
};

export const useBootcamp = () => React.useContext(BootcampContext);
