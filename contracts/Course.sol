//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract Course is Initializable, OwnableUpgradeable {
    // EVENTS
    event Graduate(bytes32 merkelProof, string courseCID);

    // STATE
    string private courseCID;
    //      merkle proof => cid
    mapping(bytes32 => string) public graduations;

    function initialize(string memory _courseCID, address _owner)
        external
        initializer
    {
        courseCID = _courseCID;
        __Ownable_init();
        transferOwnership(_owner);
    }

    function isCertified(
        bytes32[] memory proof,
        bytes32 leaf,
        bytes32 root
    ) external view returns (bool) {
        require(bytes(graduations[root]).length > 0, "Root not found");
        return MerkleProofUpgradeable.verify(proof, root, leaf);
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
