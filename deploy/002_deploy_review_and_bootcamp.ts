import "@nomiclabs/hardhat-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const Course = await hre.ethers.getContractFactory("Course");
  const course = await Course.deploy();

  const Bootcamp = await hre.ethers.getContractFactory("Bootcamp");
  const bootcamp = await Bootcamp.deploy(
    course.address,
    "Chainshot",
    "New York"
  );

  const Review = await hre.ethers.getContractFactory("Review");
  const review = await Review.deploy();

  await course.deployed();

  await bootcamp.deployed();
  await review.deployed();

  saveDeployedAddress({ contractName: "Bootcamp", contract: bootcamp });
  saveDeployedAddress({ contractName: "Review", contract: review });
  saveDeployedAddress({ contractName: "Course", contract: course });

  console.log("Bootcamp deployed to: ", bootcamp.address);
  console.log("Course deployed to: ", course.address);
  console.log("Review deployed to: ", review.address);
};
export default func;