//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Course.sol";

contract Review is Ownable {
    address[] public bootcamps;

    event NewBootcamp(address indexed bootcamp);
    event NewReview(address indexed course, address indexed reviewer, string reviewURI, uint256 rating);

    function _bootcampExists(address bootcamp) internal view returns (bool) {
        address[] memory _bootcamps = bootcamps;
        for (uint256 i = 0; i < _bootcamps.length; i++) {
            if (_bootcamps[i] == bootcamp) {
                return true;
            }
        }
        return false;
    }

    function addBootcamp(address bootcamp) external {
        require(!_bootcampExists(bootcamp), "Already Exists");
        bootcamps.push(bootcamp);

        emit NewBootcamp(bootcamp);
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

}
