import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

// Previously added CID's
const CIDS = {
  bootcamp: "QmRSrcFg6vn3rrU1yuQ8pGJQ1eJy2wRtPuPLncrsPhd1P8",
  course: "QmWNmLcjxbFx9EmYCZ6dnQeWHEttTR5Lj9VpKM7d3zf69z",
  graduation: "QmU5BuyjKVGkBX2zhYha3ssc6LuBtPCnUfaAgpLeh4sAk7",
  review: "Qmbd1unYAmEFtYdV68KuD1v4FGocU68wLpRmJypwoVwFXo",
};

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
