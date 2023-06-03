const { ethers } = require("hardhat");

const deployBox = async function (hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts(); // deployer taken from "namedAccounts" in "../hardhat.config.js"

  log("Deploying Box...");

  const box = await deploy("Box", {
    from: deployer,
    args: [], // "Box.sol" constructor arguments
    log: true,
    // waitConfirmations:   // This wait period is used to support auto-verification
  }); // deploy(nameOfTheContract, {parameters})

  // verify

  // Getting box contract
  const boxContract = await ethers.getContractAt("Box", box.address);

  // Giving Box's ownership to governance process
  const timeLock = await ethers.getContract("TimeLock");

  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address);
  await transferOwnerTx.wait(1);
  log("Deployed. Ownership also transferred to TimeLock");
};

module.exports = deployBox;
