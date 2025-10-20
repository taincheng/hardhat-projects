const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("NftAucton", async function () { 
    it("Starting Auction", async function () { 
        const NFTAucton = await ethers.getContractFactory("NftAuction");
        const NFTAuctonContract = await NFTAucton.deploy();
        await NFTAuctonContract.waitForDeployment();
    
        await NFTAuctonContract.createAuction(
            100 * 1000,
            1000000,
            ethers.ZeroAddress,
            1
        );
        const auction = await NFTAuctonContract.auctions(0);

        console.log(auction);
    })
});