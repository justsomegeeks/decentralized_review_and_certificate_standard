import React, { ReactNode, useState } from "react";
import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import { Review } from "../../types/Review";
import { abi as reviewABI } from "../../abis/Review.json";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import deployedAddresses from "../../helpers/deployedAddress.json";
import { useTransaction } from "../TransactionContext";
import { getIPFSHTTPClient, STUDENTADDRESSES } from "../../helpers";
import { keccak256 } from "ethers/lib/utils";
import { useMessage } from "../MessageContext";
import { useNavigate } from "react-router-dom";

type ReviewCourseArgs = {
  reviewer: string;
  email: string;
  title: string;
  body: string;
  rating: number;
  batch: string;
  course: string;
};

interface ReviewState {
  txPending: boolean;
  addBootcamp?: (cid: string) => void;
  reviewCourse?: ({
    batch,
    course,
    reviewer,
    email,
    title,
    body,
    rating,
  }: ReviewCourseArgs) => void;
}
const initialState: ReviewState = {
  txPending: false,
};

const ReviewContext = React.createContext<ReviewState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const ReviewProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const { walletAddress } = useWallet();
  const { setGlobalMessage } = useMessage();
  const { setPending } = useTransaction();
  const [txPending, setTxPending] = useState(false);
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

  async function reviewCourse({
    batch,
    body,
    title,
    email,
    reviewer,
    course,
    rating,
  }: ReviewCourseArgs): Promise<void> {
    if (
      !batch ||
      !email ||
      !body ||
      !title ||
      !reviewer ||
      !course ||
      !rating
    ) {
      throw new Error("Input fields cannot be empty");
    }
    setTxPending(true);

    if (contract) {
      const ipfs = getIPFSHTTPClient();
      const files = {
        path: "/",
        content: JSON.stringify({
          batch,
          body,
          title,
          email,
          reviewer,
          course: contract.address,
          rating,
        }),
      };

      const ipfsResponse = await ipfs.add(files);
      const merkleTree = new MerkleTree(STUDENTADDRESSES, keccak256, {
        hashLeaves: true,
        sortPairs: true,
      });
      const root = merkleTree.getHexRoot();
      const provider = await getProvider();
      const signer = provider.getSigner();
      const leaf = keccak256(await signer.getAddress());
      const proof = merkleTree.getHexProof(leaf);
      setPending(true);
      // reviewCourse(address,string,uint256,bytes32[],bytes32)

      // TODO: fix this
      const tx = await contract.reviewCourse(
        contract.address,
        ipfsResponse.path,
        ethers.utils.formatUnits(rating, 2),
        proof,
        root
      );
      await tx.wait();
      setPending(false);
      setTxPending(false);

      navigate(-1);
      setGlobalMessage({
        message: "Your review has been submitted succesfully",
        type: "success",
      });
      setTimeout(() => {
        setGlobalMessage({});
      }, 5000);
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
    <ReviewContext.Provider value={{ reviewCourse, addBootcamp, txPending }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => React.useContext(ReviewContext);
