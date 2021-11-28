import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { Bootcamp, Course, Review } from "../typechain";
import { CIDS } from "../helpers/constants";
import deployedAddresses from "../frontend/src/helpers/deployedAddress.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";

async function main() {

  const students = await ethers.provider.listAccounts();
  const merkleTree = new MerkleTree(students, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  const root = merkleTree.getHexRoot();
  const leaf = keccak256(students[0]);
  const proof = merkleTree.getHexProof(leaf);
  const RATING = ethers.utils.parseUnits("5", 2);

  const bootcampContract = (await ethers.getContractAt(
    "Bootcamp",
    deployedAddresses.Bootcamp
  )) as unknown as Bootcamp;
  const reviewContract = (await ethers.getContractAt(
    "Review",
    deployedAddresses.Review
  )) as unknown as Review;
  const courseContract = (await ethers.getContractAt(
    "Course",
    deployedAddresses.Course
  )) as unknown as Course;

  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

  // ADD A BOOTCAMP SO THAT REVIEW PROTOCOL KEEPS RECORD OF IT
  const addBootcamp = await reviewContract.addBootcamp(
    bootcampContract.address
  );
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

  console.log("-> Created Course deployed to:", createdCourse.address);
  console.log("\t- Owner of created course:", await createdCourse.owner());

  saveDeployedAddress({ contractName: "Course", contract: createdCourse });

  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

  const graduate = await createdCourse.graduate(root, CIDS.graduation);
  console.log("-> Graduate students from the course");

  await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

  const reviewCourse = await reviewContract.reviewCourse(
    createdCourse.address,
    CIDS.review,
    RATING,
    proof,
    root
  );

  console.log("-> Review added to course:", createdCourse.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
