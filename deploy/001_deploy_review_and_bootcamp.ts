import { ethers } from 'hardhat';
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
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

const func: DeployFunction = async function () {

  // -----------------------
  // Initialization & Setup
  // -----------------------
  const [deployer] = await ethers.getSigners();

  const students = await ethers.provider.listAccounts();
  const merkleTree = new MerkleTree(students, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  const root = merkleTree.getHexRoot();
  const leaf = keccak256(students[0]);
  const proof = merkleTree.getHexProof(leaf);
  const RATING = ethers.utils.parseUnits("5", 2);

  console.log('');
  console.log('-'.repeat(80))
  // --------------------------------------
  // deploy Course Implementation Contract
  // --------------------------------------
  const CourseImplFactory = await ethers.getContractFactory(
    "Course",
    deployer
  ) as Course__factory;
  const courseImplContract = await CourseImplFactory.deploy();
  await courseImplContract.deployed();
  console.log("Course Implementation deployed to:",courseImplContract.address);
  // -------------------------
  // deploy bootcamp contract
  // -------------------------
  const BootcampFactory = await ethers.getContractFactory(
    "Bootcamp",
    deployer
  ) as Bootcamp__factory;
  const bootcampContract = await BootcampFactory.deploy(
    courseImplContract.address,
    CIDS.bootcamp
  );
  await bootcampContract.deployed();
  console.log("Bootcamp deployed to:", bootcampContract.address);
  // ----------------------
  // deploy review contract
  // ----------------------
  const ReviewFactory = (await ethers.getContractFactory(
    "Review",
    deployer
  )) as Review__factory;
  const reviewContract = (await ReviewFactory.deploy());
  await reviewContract.deployed();
  console.log("Review deployed to:", reviewContract.address);
  console.log('-'.repeat(80))

  // --------------------------------
  // Save deployed addresses to file
  // --------------------------------
  saveDeployedAddress({ contractName: "Bootcamp", contract: bootcampContract });
  console.log("Saved bootcamp address to deployed address json");

  saveDeployedAddress({ contractName: "Review", contract: reviewContract });
  console.log("Saved Review address deployed address json");

  saveDeployedAddress({ contractName: "CourseImpl", contract: courseImplContract });
  console.log("Saved Course Implementation address to deployed address json");
  console.log('-'.repeat(80))


  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days


  // ADD A BOOTCAMP SO THAT REVIEW PROTOCOL KEEPS RECORD OF IT
  const addBootcamp = await reviewContract.addBootcamp(
    bootcampContract.address
  );
  await addBootcamp.wait();
  console.log("-> Added new bootcamp to a review protocol");

  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

  // NEWLY CREATED COURSE IN A BOOTCAMP
  const createdContractAddress =
    "0x" +
    keccak256(ethers.utils.RLP.encode([bootcampContract.address, "0x01"]))
      .toString("hex")
      .slice(-40);

  const createdCourse = (await ethers.getContractAt(
    "Course",
    ethers.utils.getAddress(createdContractAddress)
  )) as unknown as Course;

  const createCourse = await bootcampContract.createCourse(CIDS.course);
  await createCourse.wait();

  console.log("-> Created Course deployed to:", createdCourse.address);
  console.log("\t- Owner of created course:", await createdCourse.owner());

  saveDeployedAddress({ contractName: "Course", contract: createdCourse });

  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

  const graduate = await createdCourse.graduate(root, CIDS.graduation);
  await graduate.wait();
  console.log("-> Graduate students from the course");

  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

  const reviewCourse = await reviewContract.reviewCourse(
    createdCourse.address,
    CIDS.review,
    RATING,
    proof,
    root
  );

  await reviewCourse.wait();
  console.log("-> Review added to course:", createdCourse.address);
};

export default func;
