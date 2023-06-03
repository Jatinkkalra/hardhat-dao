require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy"); // required to run `yarn hardhat deploy`

module.exports = {
  solidity: {
    version: "0.8.18",
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337, // Used when we run tests
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337, // Used when you run `yarn hardhat node` or `yarn hardhat deploy`. A fake blockchain in the terminal.
      allowUnlimitedContractSize: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
