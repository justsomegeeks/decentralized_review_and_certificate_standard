import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { Bootcamp, Course, Review } from "../typechain/index";
import { CIDS } from "../helpers/constants";
import deployedAddresses from "../frontend/src/helpers/deployedAddress.json";
import { saveDeployedAddress } from "../frontend/src/helpers/saveAddress";

let students: string[];
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
  students = await ethers.provider.listAccounts();
  console.log(students);

  merkleTree = new MerkleTree(students, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  root = merkleTree.getHexRoot();
  leaf = keccak256(students[1]);
  proof = merkleTree.getHexProof(leaf);
}

async function writeAReview() {
  //TODO: write a review
  await reviewContract.reviewCourse(
    courseContract.address,
    CIDS.review,
    RATING,
    proof,
    root
  );
}
async function graduateStudents() {
  // TODO: call graduate from Course Contract
}
async function addABootcamp() {
  // TODO: call addBootcamp from Review Contract
}

async function createACourse() {
  // TODO: call createCourse from Bootcamp Contract
  const createCourse = await bootcampContract.createCourse(CIDS.course);
  const reciept = await createCourse.wait();
  // TODO: look into events emmitted from above reciept and get courseContractAddress
  // TODO: get the address of the newly created course and initialize it to courseContract
  // courseContract = (await ethers.getContractAt(
  //   "Course",
  //   courseAddress
  // )) as unknown as Course;
  // TODO: save deployed address to json file so that we can use in event listener and helper scripts
  // saveDeployedAddress({ contractName: "Course", contract: courseContract });
}

async function main() {
  await init();
  await addABootcamp();
  await createACourse();
  await graduateStudents();
  await writeAReview();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
