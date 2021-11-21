import { create } from "ipfs-http-client";
import axios from "axios";

const IPFS = create({ url: "https://ipfs.infura.io:5001" });

const bootcamp = {
  name: "chainshot",
  about: `The ChainShot Ethereum Developer Bootcamp will fast-track your Ethereum developer career by guiding you to become an effective and security-minded smart contracts developer. We start with first principles so you will be prepared to adapt quickly in a rapidly evolving field. Studying cryptographic primitives and building general components of a blockchain will lay the groundwork for writing smart contracts and understanding the environments they execute in. While learning these concepts you will be fully immersed in the bootcamp; interacting with your classmates and instructor through guided activities and coding sessions. We take a hands-on approach to learning where you will take new concepts and apply them immediately. The classes are most effective with live participation and will run on a daily schedule. If you are unable to attend a session, you can let the instructor know ahead of time and the session will be recorded for your later viewing.`,
  location: "online",
};

const course = {
  name: "Ethereum Developer Bootcamp",
  cost: "$3,000",
  duration: "10 weeks",
  locations: "online",
  description: `
  A ten-week instructor-led bootcamp that begins with learning the basics of cryptography and blockchain, moving on to Ethereum front-end libraries such as Ethers.js, learning Solidity, and finally wrapping all together to build multiple decentralized applications. Students will complete the course by building their own decentralized application from scratch.  Tuition for the Ethereum Developer Bootcamp is $3,000 as of March 2021.  Payment plans are available. As tuition prices are always changing, please check our website for the most up to date tuition prices.  `,
  subjects: `Solidity, Blockchain and Crypto, Blockchain, Ethereum Network, Cryptography`,
};

const graduation = {
  date: "November 19th, 2021",
  graduates: [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
    "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
    "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
    "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
    "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  ],
};
const review = {
  reviewer: "Chiranjibi",
  email: "chiranpoudyal@gmail.com",
  title:
    "Chainshot is the place you go to learn about web3 from first principles.",
  body: `From intricacies of Nakamato Consensus to the world of solidity and beyond. The course has been designed in such a way that you will get a complete overview on how everything started and how web3 works. That too within a 10 week period. Which is astounding. The best part the course, it is not static. The course has been designed in such a way that you get a deep dive through recent innovation in the web3 world. Even if you don't have enough coding skills Chainshot Team will help you out in any way possible.  The Chainshot experience exceeded my expectations and chainshot community is always there to help you out.`,
  rating: 5,
  batch: "Nov 2021",
  course: "0xbl124",
};

const main = async () => {
  console.log("ADDING");
  const files = {
    path: "/",
    content: JSON.stringify(graduation),
  };
  const response = await IPFS.add(files);
  console.log(response.path);
  const res = await axios.get(`https://ipfs.io/ipfs/${response.path}`);
  console.log(res.data);
};

main();
