//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReview {
    function addCourse(address course, string memory courseURI) external;

    function addBootcamp(address bootcamp, string memory bootcampURI)
        external
        payable;

    function reviewCourse(
        uint256 courseId,
        string memory reviewURI,
        uint256 rating,
        bytes32[] calldata proof,
        bytes32 root
    ) external;

    // // Employer can call this function if he/she has employed bootcamp graduate for at least 6 months
    // function reviewBootcamp(address bootcamp, bytes[] memory proof) external;

    event NewCourse(address indexed bootcamp, address courseAddress);

    event NewReview(
        uint256 courseId,
        address indexed reviewer,
        string reviewUID
    );
}
