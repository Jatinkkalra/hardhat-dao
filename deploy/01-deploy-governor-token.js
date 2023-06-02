const { ethers } = require("hardhat");

const deployGovernanceToken = async function (hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts(); // deployer taken from "namedAccounts" in "../hardhat.config.js"
  console.log("Deploying Governance Token...");
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations:   // This wait period is used to support auto-verification
  }); // deploy(nameOfTheContract, {parameters})

  console.log(
    `Deployed Governance Token to address ${governanceToken.address}`
  );
  await delegate(governanceToken.address, deployer);
  console.log("Delegated!");
  // verify
};

// Nobody has voting power as nobody has token delegated to them. To delegate token to our Deployer:
const delegate = async function (governanceTokenAddress, delegatedAccount) {
  const governanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress
  );
  const tx = await governanceToken.delegate(delegatedAccount);
  await tx.wait(1);
  console.log(
    `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}` // `.numCheckpoints` source: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol
  );
};

module.exports = deployGovernanceToken; // Error prompt if not written: "TypeError: deployScript.func is not a function"
