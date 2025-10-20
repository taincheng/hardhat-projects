const { vars } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require("@openzeppelin/hardhat-upgrades")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    deployer: 0,
    user1: 1,
    user2: 2,
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`,
      accounts: [vars.get("PK")]
    }
  }
};
