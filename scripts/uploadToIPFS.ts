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
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
    "0x976ea74026e726554db657fa54763abd0c3a0aa9",
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
    content: JSON.stringify(bootcamp),
  };
  const response = await IPFS.add(files);
  console.log(response.path);
  const res = await axios.get(`https://ipfs.io/ipfs/${response.path}`);
  console.log(res.data);
};

main();
