import "@nomiclabs/hardhat-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Bootcamp, Course } from "../typechain";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";
import { CIDS } from "../helpers/constants";
import { ethers } from "hardhat";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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

  const Course = await hre.ethers.getContractFactory("Course", deployer);
  const course = await Course.deploy();

  const Bootcamp = await hre.ethers.getContractFactory("Bootcamp", deployer);
  const bootcamp = (await Bootcamp.deploy(
    course.address,
    CIDS.bootcamp
  )) as unknown as Bootcamp;

  const Review = await hre.ethers.getContractFactory("Review", deployer);
  const review = await Review.deploy();

  await bootcamp.deployed();
  console.log("\nBootcamp deployed to: ", bootcamp.address);

  await course.deployed();
  console.log("Course Implementation deployed to: ", course.address);

  await review.deployed();
  console.log("Review deployed to:", review.address);

  saveDeployedAddress({ contractName: "Bootcamp", contract: bootcamp });
  saveDeployedAddress({ contractName: "Review", contract: review });
  saveDeployedAddress({ contractName: "CourseImpl", contract: course });
  console.log("saved bootcamp, review and CourseImpl to deployed address json");

  await review.addBootcamp(bootcamp.address);
  console.log("Called add bootcamp function on review contract");

  setTimeout(async () => {
    await bootcamp.connect(deployer).createCourse(CIDS.course);
    console.log(await createdCourse.owner());
  }, 5000);
  const createdcontractAddress =
    "0x" +
    keccak256(ethers.utils.RLP.encode([bootcamp.address, "0x01"]))
      .toString("hex")
      .slice(-40);

  const createdCourse = (await ethers.getContractAt(
    "Course",
    ethers.utils.getAddress(createdcontractAddress)
  )) as unknown as Course;
  saveDeployedAddress({ contractName: "Course", contract: createdCourse });

  setTimeout(async () => {
    await createdCourse.graduate(root, CIDS.graduation);
  }, 10000);

  setTimeout(async () => {
    await review.reviewCourse(
      createdCourse.address,
      CIDS.review,
      RATING,
      proof,
      root
    );
  }, 15000);

  console.log("Created Course deployed to:", createdCourse.address, "\n");
};

export default func;
