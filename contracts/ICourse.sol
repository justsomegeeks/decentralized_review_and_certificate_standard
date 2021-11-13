//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICourse {
    event Graduate(bytes32 merkelProof, string courseCID);

    function isCertified(bytes32[] memory proof, bytes32 root)
        external
        view
        returns (bool);

    function graduate(bytes32 _hash, string memory cid) external;

    function getCourseCID() external returns (string memory);
}
