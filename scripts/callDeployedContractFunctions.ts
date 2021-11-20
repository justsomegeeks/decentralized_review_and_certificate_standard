import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { Bootcamp, Course, Review } from "../typechain";
import { CIDS } from "../helpers/constants";
import deployedAddresses from "../frontend/src/helpers/deployedAddress.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let students: string[];
let signer1: SignerWithAddress;
let merkleTree: MerkleTree;
let root: string;
let leaf: string;
let proof: string[];
let bootcampContract: Bootcamp;
let reviewContract: Review;
let courseContract: Course;
const RATING = ethers.utils.parseUnits("5", 2);

async function init() {
  bootcampContract = (await ethers.getContractAt(
    "Bootcamp",
    deployedAddresses.Bootcamp
  )) as unknown as Bootcamp;
  reviewContract = (await ethers.getContractAt(
    "Review",
    deployedAddresses.Review
  )) as unknown as Review;
  courseContract = (await ethers.getContractAt(
    "Course",
    deployedAddresses.Course
  )) as unknown as Course;

  students = await ethers.provider.listAccounts();
  //console.log(students);

  [signer1] = await ethers.getSigners();

  merkleTree = new MerkleTree(students, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  root = merkleTree.getHexRoot();
  leaf = keccak256(students[0]);
  proof = merkleTree.getHexProof(leaf);
}

async function createACourse() {
  await bootcampContract.createCourse(CIDS.course);
}

async function graduateStudents() {
  await courseContract.graduate(root, CIDS.graduation);
}

async function addABootcamp() {
  await reviewContract.addBootcamp(deployedAddresses.Bootcamp);
}

async function writeAReview() {
  await reviewContract
    .connect(signer1)
    .reviewCourse(courseContract.address, CIDS.review, RATING, proof, root);
}

async function main() {
  console.log("\n");
  await init();
  // await addABootcamp();
  //await graduateStudents();
  await createACourse();
  //await writeAReview();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
