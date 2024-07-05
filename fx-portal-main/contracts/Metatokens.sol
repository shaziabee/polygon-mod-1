// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract Nomme is ERC721A {
    address public owner;

    uint256 public maxQuantity = 5;

    string public baseURI =
        "";

    string public description = "not me";

    constructor() ERC721A("CuteCats", "CC") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You can not mint more than 5"
        );
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function getDescription() external view returns (string memory) {
        return description;
    }
}
