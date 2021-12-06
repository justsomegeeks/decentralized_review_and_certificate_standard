import axios from "axios";
import { create, IPFSHTTPClient } from "ipfs-http-client";

export const joinClasses = (...classes: string[]) => {
  return classes.join(" ");
};

export const networkNameFromId = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Gorli",
  42: "Kovan",
};

export const getTruncatedAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 2)}`;
};

export const getIPFSHTTPClient = (): IPFSHTTPClient => {
  const ipfsHTTPClient = create({ url: "https://ipfs.infura.io:5001" });
  return ipfsHTTPClient;
};

export const SERVER = "http://localhost:4000";

export const fetchCidData = async (cid: string) => {
  const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
  return response.data;
};
