//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Course is Initializable, Ownable {
    // EVENTS
    event Graduate(bytes32 merkelProof, string courseCID);

    // STATE
    string private courseCID;
    //      merkle proof => cid
    mapping(bytes32 => string) graduations;

    function initialize(string memory _courseCID, address _owner)
        external
        initializer
    {
        courseCID = _courseCID;
        transferOwnership(_owner);
    }

    function isCertified(
        bytes32[] memory proof,
        bytes32 leaf,
        bytes32 root
    ) external view returns (bool) {
        require(bytes(graduations[root]).length > 0, "Root not found");
        return MerkleProof.verify(proof, root, leaf);
    }

    // TODO: only owner should be allowed to call this function.
    // Should owner be the Bootcamp contract or EOA?
    function graduate(bytes32 _hash, string memory _cid) external onlyOwner {
        graduations[_hash] = _cid;
        emit Graduate(_hash, _cid);
    }

    function getCourseCID() external view returns (string memory) {
        return courseCID;
    }
}
