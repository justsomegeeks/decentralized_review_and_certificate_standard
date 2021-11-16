import { expect } from "chai";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {
  Bootcamp,
  Bootcamp__factory,
  Course,
  Course__factory,
  Review,
  Review__factory,
} from "../typechain/index";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

describe("Review", async () => {
  let course: Course;
  let bootcamp: Bootcamp;
  let review: Review;
  let bootcampCourse: Course;
  let students: string[];
  let merkleTree: MerkleTree;
  let root: string;
  let leaf: string;
  let proof: string[];
  let deployer: SignerWithAddress;
  let signer1: SignerWithAddress;
  const CID =
    "0x9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08";
  const RATING = ethers.utils.parseUnits("5", 2);
  console.log(RATING.toNumber());

  before(async () => {
    [deployer, signer1] = await ethers.getSigners();

    const Course = (await ethers.getContractFactory(
      "Course",
      deployer
    )) as unknown as Course__factory;
    course = await Course.deploy();
    await course.deployed();

    const Review = (await ethers.getContractFactory(
      "Review",
      deployer
    )) as unknown as Review__factory;
    review = await Review.deploy();
    await review.deployed();

    const Bootcamp = (await ethers.getContractFactory(
      "Bootcamp",
      signer1
    )) as unknown as Bootcamp__factory;
    bootcamp = await Bootcamp.deploy(course.address, "Bootcamp", "US");
    await bootcamp.deployed();

    students = await ethers.provider.listAccounts();

    merkleTree = new MerkleTree(students, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });
    root = merkleTree.getHexRoot();
    leaf = keccak256(students[1]);
    proof = merkleTree.getHexProof(leaf);
  });

  it("Should emit Review Event", async () => {
    const clonedContractAddress =
      "0x" +
      keccak256(ethers.utils.RLP.encode([bootcamp.address, "0x01"]))
        .toString("hex")
        .slice(-40);
    const clonedContractAddressWithChecksum = ethers.utils.getAddress(
      clonedContractAddress
    );

    await bootcamp.createCourse(CID);
    const courseAddress = clonedContractAddressWithChecksum;
    const BootcampCourse = (await ethers.getContractAt(
      "Course",
      courseAddress,
      signer1
    )) as unknown as Course__factory;

    bootcampCourse = await BootcampCourse.attach(courseAddress);

    await expect(bootcampCourse.graduate(root, CID))
      .to.emit(bootcampCourse, "Graduate")
      .withArgs(root, CID);

    await expect(
      review
        .connect(signer1)
        .reviewCourse(courseAddress, CID, RATING, proof, root)
    )
      .to.emit(review, "NewReview")
      .withArgs(courseAddress, await signer1.getAddress(), CID, RATING);
  });
  it("should add a course and emit NewCourse Event", async () => {
    const clonedContractAddress =
      "0x" +
      keccak256(ethers.utils.RLP.encode([bootcamp.address, "0x01"]))
        .toString("hex")
        .slice(-40);
    const clonedContractAddressWithChecksum = ethers.utils.getAddress(
      clonedContractAddress
    );

    await bootcamp.createCourse(CID);
    const courseAddress = clonedContractAddressWithChecksum;
    const BootcampCourse = (await ethers.getContractAt(
      "Course",
      courseAddress,
      signer1
    )) as unknown as Course__factory;

    bootcampCourse = await BootcampCourse.attach(courseAddress);

    await expect(review.addCourse(bootcampCourse.address, courseAddress))
      .to.emit(review, "NewCourse")
      .withArgs(bootcampCourse.address, courseAddress);
  });
  it("should fail if duplicate course is being added", async () => {
    const clonedContractAddress =
      "0x" +
      keccak256(ethers.utils.RLP.encode([bootcamp.address, "0x01"]))
        .toString("hex")
        .slice(-40);
    const clonedContractAddressWithChecksum = ethers.utils.getAddress(
      clonedContractAddress
    );

    await bootcamp.createCourse(CID);
    const courseAddress = clonedContractAddressWithChecksum;
    const BootcampCourse = (await ethers.getContractAt(
      "Course",
      courseAddress,
      signer1
    )) as unknown as Course__factory;

    bootcampCourse = await BootcampCourse.attach(courseAddress);

    await expect(
      review.addCourse(bootcampCourse.address, courseAddress)
    ).to.revertedWith("Already Exists");
  });
});
