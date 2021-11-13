import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { Greeter } from "../Greeter";
import { getProvider } from "../provider";
import { useTransaction } from "./TransactionContext";
import { useWallet } from "./WalletContext";
import greeterArtifact from "../abis/Greeter.json";
import deployedAddress from "../helpers/deployedAddress.json";
import { useMessage } from "./MessageContext";

const initialState: GreeterState = {
  greeting: "",
};

const GreeterContext = React.createContext<GreeterState>(initialState);

interface GreeterState {
  greeting: string;
  updateGreeting?: (greeting: string) => void;
}

type ProviderProps = {
  children: ReactNode;
};
export const GreeterProvider = ({ children }: ProviderProps) => {
  const { setPending } = useTransaction();
  const { walletAddress } = useWallet();
  const { setGlobalMessage } = useMessage();

  const [message, setMessage] = React.useState<string>();
  const [contract, setContract] = React.useState<Greeter>();

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        deployedAddress.Greeter,
        greeterArtifact.abi,
        signer
      ) as unknown as Greeter;
      setContract(_contract);
      const _greeting = await _contract.greet();
      setMessage(_greeting);
    }
    if (walletAddress) {
      init();
    }
  }, [walletAddress]);

  async function updateGreeting(_greeting: string) {
    if (contract) {
      try {
        const tx = await contract.setGreeting(_greeting);
        setPending(true);
        await tx.wait();
        setPending(false);
        const _newGreeting = await contract.greet();
        setMessage(_newGreeting);
        setGlobalMessage({
          message: "Greeting message updated successfully!",
          type: "success",
        });
      } catch (err: any) {
        setGlobalMessage({
          message: err.message,
          type: "error",
        });
      }
      setTimeout(() => {
        setGlobalMessage({});
      }, 5000);
    }
  }

  return (
    <GreeterContext.Provider
      value={{
        greeting: message || "",
        updateGreeting,
      }}
    >
      {children}
    </GreeterContext.Provider>
  );
};

export const useGreeter = () => React.useContext(GreeterContext);
