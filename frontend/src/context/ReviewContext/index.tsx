import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { Review } from "../../types/Review";
import { abi as reviewABI } from "../../abis/Review.json";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import deployedAddresses from "../../helpers/deployedAddress.json";

type ReviewCourse = {
  courseAddress: string;
  reviewCID: string;
  rating: number;
  proof: string[];
  root: string;
};

interface ReviewState {
  addBootcamp?: (cid: string) => void;
  reviewCourse?: ({
    courseAddress,
    reviewCID,
    rating,
    proof,
    root,
  }: ReviewCourse) => void;
}
const initialState: ReviewState = {};

const ReviewContext = React.createContext<ReviewState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const ReviewProvider = ({ children }: ProviderProps) => {
  const { walletAddress } = useWallet();
  const [contract, setContract] = React.useState<Review>();

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        deployedAddresses.Course,
        reviewABI,
        signer
      ) as unknown as Review;
      setContract(_contract);
    }
    if (walletAddress) {
      init();
    }
  }, [walletAddress]);

  async function reviewCourse() {
    if (contract) {
      //
    }
  }
  async function addBootcamp() {
    if (contract) {
      //
    }
  }
  if (contract) {
    contract.on("NewReview", () => {
      // TODO: update state
    });
    contract.on("NewBootcamp", () => {
      // TODO: update state
    });
  }

  return (
    <ReviewContext.Provider value={{ reviewCourse, addBootcamp }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => React.useContext(ReviewContext);
