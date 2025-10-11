const hre = require("hardhat");

describe("MyToken Test", async() => {
    before(async() => { 
        console.log("Deploying MyToken...");

        await new Promise((reslove) => {
            setTimeout(() => {
                reslove(1)
            }, 2000)
        })

        console.log("Deploying MyToken...Done");
    })

    it("test1", async() => {
        console.log("test1");
    })
})