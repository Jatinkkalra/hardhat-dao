const {
  VOTING_DELAY,
  VOTING_PERIOD,
  QUOROM_PERCENTAGE,
} = require("../helper-hardhat-config");

const deployGoverorContract = async function (hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts(); // deployer taken from "namedAccounts" in "../hardhat.config.js"

  console.log("Deploying Governor Contract...");

  // Need both other deployments to be passed as parameters for our governor contract:
  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUOROM_PERCENTAGE,
    ], // "GovernorContract.sol" constructor arguments
    // log: true,
    // waitConfirmations:   // This wait period is used to support auto-verification
  }); // deploy(nameOfTheContract, {parameters})

  // verify
};

module.exports = deployGoverorContract;
