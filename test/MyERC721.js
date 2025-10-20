const { expect } = require("chai");
const hre = require("hardhat");

describe("MyERC721", async () => {
  const { ethers } = hre;
  let MyERC721Contract;

  beforeEach(async () => {
    [account1, account2] = await ethers.getSigners();
    const MyERC721 = await ethers.getContractFactory("MyERC721");
    MyERC721Contract = await MyERC721.deploy();
    await MyERC721Contract.waitForDeployment();
    const contractAddress = await MyERC721Contract.getAddress();
    expect(contractAddress).to.length.greaterThan(0);
  });

  it("Should mint an NFT", async () => {
    console.log("Minting NFT...");
  });
});
