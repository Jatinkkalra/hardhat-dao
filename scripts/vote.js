const {
  proposalsFile,
  developmentChains,
  VOTING_PERIOD,
} = require("../helper-hardhat-config");
const { network, ethers } = require("hardhat");
const fs = require("fs");
const moveBlocks = require("../utils/move-blocks");

const index = 0;

async function vote(proposalIndex) {
  // Fetching Proposal
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8")); // grabbing list of proposals
  console.log(proposals);
  const proposalId =
    proposals[network.config.chainId.toString()][proposalIndex]; // Our proposal Id

  // Voting Now
  const voteWay = 1; // 0 = Against, 1 = For, 2 = Abstain
  const governor = await ethers.getContract("GovernorContract");
  const reason = "Whatever reason";
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  ); // castVoteWithReason() function source: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/Governor.sol

  await voteTxResponse.wait(1);

  // Moving the blocks for testing purpose
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1);
  }
  console.log("Voted! Ready to go!");
}

vote(index)
  .then(() => process.exit(0)) // boiler code
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
