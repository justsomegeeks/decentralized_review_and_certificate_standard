const fs = require("fs-extra");
const path = require("path");

const saveDeployedAddress = ({ contractName, contract }) => {
  const { address } = contract;

  // Read JSON data
  const deployedAddressPath = path.resolve(__dirname, "deployedAddress.json");
  // create a file if it doesn't exist
  fs.ensureFileSync(deployedAddressPath);

  const data = fs.readFileSync(deployedAddressPath, "utf-8");
  let deployedContracts;
  // Check file is empty or not
  if (data) {
    deployedContracts = JSON.parse(data);
  } else {
    deployedContracts = {};
  }
  deployedContracts[contractName] = address;

  // Finally write updated object to JSON file
  fs.writeFileSync(deployedAddressPath, JSON.stringify(deployedContracts));
};

module.exports = {
  saveDeployedAddress,
};
