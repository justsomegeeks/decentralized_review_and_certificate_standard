//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Course.sol";

contract Bootcamp is Ownable {
    event CourseCreated(address courseAddress, string courseCID);
    address immutable courseImplementationAddress;
    // TODO: Should this be string or bytes32 for saving gas?
    string public name;
    string public location;

    constructor(
        address _courseImplementationAddress,
        string memory _name,
        string memory _location
    ) {
        name = _name;
        location = _location;
        courseImplementationAddress = _courseImplementationAddress;
    }

    function createCourse(string memory _courseCID) external onlyOwner returns(address){
        address cloneAddress = Clones.clone(courseImplementationAddress);
        Course(cloneAddress).initialize(_courseCID, owner());
        emit CourseCreated(cloneAddress, _courseCID);
        return cloneAddress;
    }

    function getImplementationAddress() external view returns (address) {
        return courseImplementationAddress;
    }
}
