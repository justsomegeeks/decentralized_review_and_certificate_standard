import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { Course__factory, Course } from "../typechain/index";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

describe("Course", async () => {
  let course: Course;
  let students;
  let merkleTree;
  let root: string;
  let leaf: string;
  let proof: string[];
  const CID =
    "0x9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08";

  before(async () => {
    const [deployer] = await ethers.getSigners();

    const Course = (await ethers.getContractFactory(
      "Course",
      deployer
    )) as unknown as Course__factory;
    course = await Course.deploy();

    await course.initialize(CID, deployer.address);

    students = await ethers.provider.listAccounts();
    merkleTree = new MerkleTree(students, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });
    root = merkleTree.getHexRoot();
    leaf = keccak256(students[4]);
    proof = merkleTree.getHexProof(leaf);
  });

  it("Returns Course CID", async () => {
    expect(await course.getCourseCID()).to.equal(CID);
  });

  it("Should emit graduate event", async () => {
    await expect(course.graduate(root, CID))
      .to.emit(course, "Graduate")
      .withArgs(root, CID);
  });

  it("returns true for a valid Merkle proof", async () => {
    expect(await course.isCertified(proof, leaf, root)).to.equal(true);
  });
});
