// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyERC721 is ERC721URIStorage{
    address public owner;
    uint256 private _tokenIds;

    constructor() ERC721("MyERC721", "M721") {
        owner = msg.sender;
    }


    function mintNFT(address _to, string memory _tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenIds;
        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        unchecked {
            _tokenIds ++;
        }
        return newItemId;
    }

    // 可选：只有合约所有者可以铸造
    function ownerMint(address to, string memory tokenURI) public returns (uint256) {
        require(msg.sender == owner, "Only owner can mint");
        return mintNFT(to, tokenURI);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds;
    }
}