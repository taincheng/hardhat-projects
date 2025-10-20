
/*
    1. 可升级合约模式：使用代理模式实现合约逻辑的后续升级
    2. 部署流程：从合约编译到代理部署的完整流程
    3. 信息持久化：将部署结果保存到本地文件供后续使用
    4. Hardhat 集成：利用 Hardhat 的部署系统管理合约部署
*/

// deployments 部署管理工具；upgrades：合约升级工具；ethers：以太坊交互库
const { deployments, upgrades, ethers } = require("hardhat");

const fs = require("fs");
const path = require("path");

module.exports = async ({ getNamedAccounts, deployments }) => {
  // 从 deployments 中提取 save 方法用于保存部署信息
  const { save } = deployments;
  // 获取命名账户中的 deployer (部署者账户)
  const { deployer } = await getNamedAccounts();

  console.log("部署用户地址：", deployer);
  // 使用 ethers 获取 NftAuction 合约工厂对象
  const NftAuction = await ethers.getContractFactory("NftAuction");

  // 通过代理合约部署
  // 使用 upgrades.deployProxy 部署可升级代理合约
  // 参数说明：
  //    NftAuction: 合约工厂
  //    []: 传递给初始化函数的空参数数组
  //    { initializer: "initialize" }: 指定初始化函数名为 initialize
  const nftAuctionProxy = await upgrades.deployProxy(NftAuction, [], {
    initializer: "initialize",
  });

  await nftAuctionProxy.waitForDeployment();

  const proxyAddress = await nftAuctionProxy.getAddress();
  console.log("代理合约地址：", proxyAddress);
  // 获取实现合约地址并打印
  const implAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log("实现合约地址：", implAddress);

  /*
    将部署信息写入 JSON 文件：
        代理合约地址
        实现合约地址
        合约 ABI 接口
  */
  const storePath = path.resolve(__dirname, "./.cache/proxyNftAuction.json");

  // 构建存储文件的绝对路径
  fs.writeFileSync(
    storePath,
    JSON.stringify({
      proxyAddress,
      implAddress,
      abi: NftAuction.interface.format("json"),
    })
  );

  // 使用 save 方法将部署信息注册到 Hardhat 部署系统中
  await save("NftAuctionProxy", {
    abi: NftAuction.interface.format("json"),
    address: proxyAddress,
    // args: [],
    // log: true,
  });
  //   await deploy("MyContract", {
  //     from: deployer,
  //     args: ["Hello"],
  //     log: true,
  //   });
};

// 设置部署脚本标签，便于通过 --tags 参数调用特定部署脚本
module.exports.tags = ["deployNftAuction"];
