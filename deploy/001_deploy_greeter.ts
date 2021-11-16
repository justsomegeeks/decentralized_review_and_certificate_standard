import "@nomiclabs/hardhat-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello from greeter!");

  await greeter.deployed();

  saveDeployedAddress({ contractName: "Greeter", contract: greeter });

  console.log("Greeter deployed to: ", greeter.address);
};
export default func;
