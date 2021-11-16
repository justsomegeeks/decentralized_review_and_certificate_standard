//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IReview.sol";
import "./Course.sol";

contract Review is Ownable {
    uint256 public courseCount;
    mapping(address => address[]) public bootcamps;

    function _courseExists(address bootcamp, address course)
        internal
        view
        returns (bool)
    {
        address[] memory courses = bootcamps[bootcamp];
        for (uint256 i = 0; i < courses.length; i++) {
            if (courses[i] == course) {
                return true;
            }
        }
        return false;
    }

    function addCourse(address courseAddress, address bootcamp) external {
        require(!_courseExists(bootcamp, courseAddress), "Already Exists");

        if (bootcamps[bootcamp].length == 0) {
            bootcamps[bootcamp] = [courseAddress];
        } else {
            bootcamps[bootcamp].push(courseAddress);
        }

        emit NewCourse(bootcamp, courseAddress);
    }

    function reviewCourse(
        address courseAddress,
        string memory reviewCID,
        uint256 rating,
        bytes32[] calldata proof,
        bytes32 root
    ) external {
        Course course = Course(courseAddress);
        require(
            course.isCertified(
                proof,
                keccak256(abi.encodePacked(msg.sender)),
                root
            ),
            "not certified"
        );
        emit NewReview(courseAddress, msg.sender, reviewCID, rating);
    }

    event NewCourse(address indexed bootcamp, address courseAddress);

    event NewReview(
        address indexed course,
        address indexed reviewer,
        string reviewURI,
        uint256 rating
    );
}
