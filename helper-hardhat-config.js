const MIN_DELAY = 3600; // 60 sec * 60 min = 600 seconds aka 1 hour
const VOTING_PERIOD = 5; // 5 blocks
const VOTING_DELAY = 1; //1 block
const QUOROM_PERCENTAGE = 4; // 4% of voters for quorum
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const NEW_STORE_VALUE = 77;
const FUNC = "store";
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box!";
const developmentChains = ["hardhat", "localhost"];
const proposalsFile = "proposals.json";

module.exports = {
  MIN_DELAY,
  VOTING_PERIOD,
  VOTING_DELAY,
  QUOROM_PERCENTAGE,
  ADDRESS_ZERO,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  proposalsFile,
};
