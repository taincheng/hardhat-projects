const { expect } = require("chai");
const hre = require("hardhat");

describe("MyToken Test", async() => {

    const {ethers} = hre
    const initialSupply = 1000000
    let MyTokenContract
    let account1, account2

    beforeEach(async() => { 
        [account1, account2] = await ethers.getSigners()
        // 工厂模板
        const MyToken = await ethers.getContractFactory("MyToken")

        MyTokenContract = await MyToken.deploy(initialSupply)

        MyTokenContract.waitForDeployment()

        const contractAddress = await MyTokenContract.getAddress()
        expect(contractAddress).to.length.greaterThan(0)

    })

    it("验证合约的 name, symbol, decimal", async() => {
        const name = await MyTokenContract.name()
        expect(name).to.equal("MyToken")
        const symbol = await MyTokenContract.symbol()
        expect(symbol).to.equal("MTK")
        const decimals = await MyTokenContract.decimals()
        expect(decimals).to.equal(18)
    })

    it("测试转账", async() => {
        console.log("test2");
        // const balanceOfAccount1 = await MyTokenContract.balanceOf(account1)
        // expect(balanceOfAccount1).to.equal(initialSupply)

        const resp = await MyTokenContract.transfer(account2.address, initialSupply / 2)
        console.log(resp);

        const balanceOfAccount2 = await MyTokenContract.balanceOf(account2)
        expect(balanceOfAccount2).to.equal(initialSupply / 2)
    })
})