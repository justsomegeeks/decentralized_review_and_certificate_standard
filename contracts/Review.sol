//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Course.sol";

contract Review is Ownable {
    mapping(address => string) public reviews;

    event NewReview(address reviewer, string cid);
    constructor() {}

    function reviewCourse(
        address courseAddress,
        string memory reviewURI,
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
        reviews[msg.sender] = reviewURI;
        emit NewReview(msg.sender, reviewURI);
    }
}
