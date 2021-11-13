const hre = require("hardhat");
const { saveDeployedAddress } = require("../frontend/src/helpers/saveAddress");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello from greeter!");

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
