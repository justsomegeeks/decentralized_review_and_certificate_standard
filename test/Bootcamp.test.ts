import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import {
  Bootcamp,
  Bootcamp__factory,
  Course,
  Course__factory,
} from "../typechain/index";
import keccak256 from "keccak256";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

describe("Bootcamp", async () => {
  let course: Course;
  let bootcamp: Bootcamp;
  let deployer: SignerWithAddress;
  let signer1: SignerWithAddress;
  const CID =
    "0x9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08";

  before(async (): Promise<any> => {
    [deployer, signer1] = await ethers.getSigners();

    const Course = (await ethers.getContractFactory(
      "Course",
      deployer
    )) as unknown as Course__factory;
    course = await Course.deploy();
    await course.deployed();

    const Bootcamp = (await ethers.getContractFactory(
      "Bootcamp",
      signer1
    )) as unknown as Bootcamp__factory;
    bootcamp = await Bootcamp.deploy(course.address, "Bootcamp", "US");
    await bootcamp.deployed();
  });
  it("Should return correct 'Name' and 'location'", async () => {
    expect(await bootcamp.name()).to.equal("Bootcamp");
    expect(await bootcamp.location()).to.equal("US");
  });

  it("Should return correct Course Implementation Address", async () => {
    expect(await bootcamp.getImplementationAddress()).to.equal(course.address);
  });

  it("Should emit Cloned course address", async () => {
    const clonedContractAddress =
      "0x" +
      keccak256(ethers.utils.RLP.encode([bootcamp.address, "0x01"]))
        .toString("hex")
        .slice(-40);
    const clonedContractAddressWithChecksum = ethers.utils.getAddress(
      clonedContractAddress
    );
    await expect(bootcamp.createCourse(CID))
      .to.emit(bootcamp, "CourseCreated")
      .withArgs(clonedContractAddressWithChecksum, CID);
  });
});
