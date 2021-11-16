const hre = require("hardhat");
const { saveDeployedAddress } = require("../frontend/src/helpers/saveAddress");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Bootcamp");
  const greeter = await Greeter.deploy("Hello from greeter!");

  const Course = await hre.ethers.getContractFactory("Course");
  course = await Course.deploy();

  const Bootcamp = await hre.ethers.getContractFactory("Bootcamp");
  bootcamp = await Bootcamp.deploy(course.address, "Bootcamp", "US");

  await greeter.deployed();

  saveDeployedAddress({ contractName: "Greeter", contract: greeter });

  console.log("Greeter deployed to: ", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
