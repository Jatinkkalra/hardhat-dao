const { ethers } = require("hardhat");
const { MIN_DELAY } = require("../helper-hardhat-config");

const deployTimelock = async function (hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts(); // deployer taken from "namedAccounts" in "../hardhat.config.js"

  console.log("Deploying Timelock....");

  const timelock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], [], deployer], // "Timelock.sol" constructor arguments
    log: true,
    // waitConfirmations:   // This wait period is used to support auto-verification
  }); // deploy(nameOfTheContract, {parameters})
};
// verify

module.exports = deployTimelock;
