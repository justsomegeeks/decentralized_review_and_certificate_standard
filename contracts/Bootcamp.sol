//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Course.sol";

contract Bootcamp is Ownable {
    event CourseCreated(address courseAddress, string courseCID, address bootcamp);
    address immutable courseImplementationAddress;
    // TODO: Should this be string or bytes32 for saving gas?
    string public cid;
    address[] public courses;

    constructor(address _courseImplementationAddress, string memory _cid) {
        cid = _cid;
        courseImplementationAddress = _courseImplementationAddress;
    }

    function createCourse(string memory _courseCID)
        external
        onlyOwner
        returns (address)
    {
        address cloneAddress = Clones.clone(courseImplementationAddress);
        Course(cloneAddress).initialize(_courseCID, owner());
        courses.push(cloneAddress);
        emit CourseCreated(cloneAddress, _courseCID, address(this));
        return cloneAddress;
    }

    function getImplementationAddress() external view returns (address) {
        return courseImplementationAddress;
    }

    function getCourses() external view returns (address[] memory) {
        return courses;
    }
}
