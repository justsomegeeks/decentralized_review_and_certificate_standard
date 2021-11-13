//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IReview.sol";
import "./Course.sol";

contract Review is Ownable, IReview {
    uint256 public courseCount;
    mapping(address => address[]) public bootcamps;

    constructor() {}

    function _courseExists(address bootcamp, address course)
        internal
        view
        returns (bool)
    {
        address[] memory courses = bootcamps[bootcamp];
        if (courses.length > 0) {
            for (uint256 i = 0; i < courses.length; i++) {
                if (courses[i] == course) {
                    return true;
                }
            }
        }
        return false;
    }

    function addCourse(address courseAddress, address bootcamp) external {
        // TODO: Verify course has been already added
        if (bootcamps[bootcamp].length == 0) {
            // TODO: Add bootcamp
        }
        bootcamps[bootcamp].push(courseAddress);

        emit NewCourse(bootcamp, courseAddress);
    }

    function reviewCourse(
        address courseAddress,
        string memory reviewURI,
        uint256 rating,
        bytes32[] calldata proof,
        bytes32 root
    ) external {
        Course course = Course(courseAddress);
        require(
            course.isCertified(
                proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "not certified"
        );
        // TODO: Check if msg.sender is certified
    }
}
