import "@nomiclabs/hardhat-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";
import { CIDS } from "../helpers/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const Course = await hre.ethers.getContractFactory("Course");
  const course = await Course.deploy();

  const Bootcamp = await hre.ethers.getContractFactory("Bootcamp");
  const bootcamp = await Bootcamp.deploy(course.address, CIDS.bootcamp);

  const Review = await hre.ethers.getContractFactory("Review");
  const review = await Review.deploy();

  await course.deployed();

  await bootcamp.deployed();
  await review.deployed();

  saveDeployedAddress({ contractName: "Bootcamp", contract: bootcamp });
  saveDeployedAddress({ contractName: "Review", contract: review });
  saveDeployedAddress({ contractName: "CourseImpl", contract: course });

  console.log("Bootcamp deployed to: ", bootcamp.address);
  console.log("Course Implemention deployed to: ", course.address);
  console.log("Review deployed to: ", review.address);
};
export default func;
