import { expect } from "chai";
import { ethers } from "hardhat";
import {Contract} from "@ethersproject/contracts";
import {ContractReceipt} from "ethers";

describe("Bootcamp", function () {
  let course: Contract;
  let bootcamp: Contract;
  const CID = '0x9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08';

  before(async (): Promise<any> => {
    const Course = await ethers.getContractFactory("Course");
    course = await Course.deploy();

    const Bootcamp = await ethers.getContractFactory("Bootcamp");
    bootcamp = await Bootcamp.deploy(course.address, 'Bootcamp', 'US');

  })
  it("Should return correct 'Name' and 'location'", async () => {

    expect(await bootcamp.name()).to.equal("Bootcamp");
    expect(await bootcamp.location()).to.equal("US");

  });

  it("Should return correct Course Implementation Address", async () => {
    expect(await bootcamp.getImplementationAddress()).to.equal(course.address)
  })


});
