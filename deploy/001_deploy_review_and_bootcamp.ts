import "@nomiclabs/hardhat-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  Bootcamp,
  Bootcamp__factory,
  Course,
  Course__factory,
  Review,
  Review__factory,
} from "../typechain";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";
import { CIDS } from "../helpers/constants";
import { ethers } from "hardhat";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { sleep } from "../helpers";
const sleepTime = 5000;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const [deployer] = await ethers.getSigners();

  const students = await ethers.provider.listAccounts();
  console.log(students);
  const merkleTree = new MerkleTree(students, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  const root = merkleTree.getHexRoot();
  const leaf = keccak256(students[0]);
  const proof = merkleTree.getHexProof(leaf);
  const RATING = ethers.utils.parseUnits("5", 2);
  console.log({ root });

  const CourseImplFactory = (await hre.ethers.getContractFactory(
    "Course",
    deployer
  )) as unknown as Course__factory;
  const courseImplContract = (await CourseImplFactory.deploy()) as Course;
  await courseImplContract.deployed();
  console.log(
    "Course Implementation deployed to: ",
    courseImplContract.address
  );

  const BootcampFactory = (await hre.ethers.getContractFactory(
    "Bootcamp",
    deployer
  )) as unknown as Bootcamp__factory;
  const bootcampContract = (await BootcampFactory.deploy(
    courseImplContract.address,
    CIDS.bootcamp
  )) as Bootcamp;
  await bootcampContract.deployed();
  console.log("\nBootcamp deployed to: ", bootcampContract.address);

  const ReviewFactory = (await hre.ethers.getContractFactory(
    "Review",
    deployer
  )) as unknown as Review__factory;
  const reviewContract = (await ReviewFactory.deploy()) as Review;
  await reviewContract.deployed();
  console.log("Review deployed to:", reviewContract.address);

  saveDeployedAddress({ contractName: "Bootcamp", contract: bootcampContract });
  saveDeployedAddress({ contractName: "Review", contract: reviewContract });
  saveDeployedAddress({
    contractName: "CourseImpl",
    contract: courseImplContract,
  });
  console.log("saved bootcamp, review and CourseImpl to deployed address json");

  await sleep(sleepTime);
  // ADD A BOOTCAMP SO THAT REVIEW PROTOCOL KEEPS RECORD OF IT
  const addBootcamp = await reviewContract.addBootcamp(
    bootcampContract.address
  );
  await addBootcamp.wait();
  console.log("Added new bootcamp to a review protocol");

  await sleep(sleepTime * 2);
  // NEWLY CREATED COURSE IN A BOOTCAMP
  const createdcontractAddress =
    "0x" +
    keccak256(ethers.utils.RLP.encode([bootcampContract.address, "0x01"]))
      .toString("hex")
      .slice(-40);

  const createdCourse = (await ethers.getContractAt(
    "Course",
    ethers.utils.getAddress(createdcontractAddress)
  )) as unknown as Course;

  const createCourse = await bootcampContract.createCourse(CIDS.course);
  await createCourse.wait();

  console.log("Created Course deployed to:", createdCourse.address, "\n");
  console.log("Owner of a course");
  console.log(await createdCourse.owner());
  console.log({
    createdAddress: createdcontractAddress,
    contractAddress: createdCourse.address,
  });

  saveDeployedAddress({ contractName: "Course", contract: createdCourse });

  await sleep(sleepTime * 3);
  const graduate = await createdCourse.graduate(root, CIDS.graduation);
  await graduate.wait();
  console.log("Graduate students from the course");

  await sleep(sleepTime * 4);
  const reviewCourse = await reviewContract.reviewCourse(
    createdCourse.address,
    CIDS.review,
    RATING,
    proof,
    root
  );

  await reviewCourse.wait();
  console.log("Review the course");
};

export default func;
