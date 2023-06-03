const { network } = require("hardhat");

async function moveBlocks(amount) {
  console.log("Moving Blocks...");
  // Mining of blocks. Code can be found in ethers and/or hardhat docs
  for (let index = 0; index < amount; index++) {
    await network.provider.request({
      method: "evm_mine",
      params: [],
    });
  }
}

module.exports = moveBlocks;
