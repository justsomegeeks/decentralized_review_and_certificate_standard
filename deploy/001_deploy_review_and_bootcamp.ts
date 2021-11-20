import "@nomiclabs/hardhat-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Bootcamp, Course } from "../typechain";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";
import { CIDS } from "../helpers/constants";
import { ethers } from "hardhat";
import keccak256 from "keccak256";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const Course = await hre.ethers.getContractFactory("Course");
  const course = await Course.deploy();

  const Bootcamp = await hre.ethers.getContractFactory("Bootcamp");
  const bootcamp = (await Bootcamp.deploy(
    course.address,
    CIDS.bootcamp
  )) as unknown as Bootcamp;

  const Review = await hre.ethers.getContractFactory("Review");
  const review = await Review.deploy();

  await course.deployed();
  await bootcamp.deployed();
  await review.deployed();

  await bootcamp.createCourse(CIDS.course);
  const createdcontractAddress =
    "0x" +
    keccak256(ethers.utils.RLP.encode([bootcamp.address, "0x01"]))
      .toString("hex")
      .slice(-40);
  const courseContract = (await ethers.getContractAt(
    "Course",
    ethers.utils.getAddress(createdcontractAddress)
  )) as unknown as Course;

  saveDeployedAddress({ contractName: "Bootcamp", contract: bootcamp });
  saveDeployedAddress({ contractName: "Review", contract: review });
  saveDeployedAddress({ contractName: "Course", contract: courseContract });

  console.log("\nBootcamp deployed to: ", bootcamp.address);
  console.log("Course Implementation deployed to: ", course.address);
  console.log("Review deployed to:", review.address, "\n");
};
export default func;
