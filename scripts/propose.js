// Objective:
// Propose to start at a value of 77

const { ethers, network } = require("hardhat");
const {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalsFile,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const fs = require("fs");

async function propose(args, functionToCall, proposalDescription) {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box"); // We want to propose the Box contract to make the changes in value

  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  ); // for calldatas of "propose" function in https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/Governor.sol
  console.log(encodedFunctionCall);

  console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
  console.log(`Proposal Description: \n ${proposalDescription}`);
  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  );
  const proposeReceipt = await proposeTx.wait(1);
  const proposalId = proposeReceipt.events[0].args.proposalId; // fetching prposalId at event creation. https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/Governor.sol
  let proposals = JSON.parse(fs.readFileSync)(proposalsFile, "utf8");
  proposals[network.config.chainId.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalsFile, JSON.stringify(proposals));
  // Fast forwarding blocks for local blockchains only
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
}

// Calling the propose funtion
propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION) // store() function of box.sol
  .then(() => process.exit(0)) // boiler code
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
