// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// To not have: Buy before snapshot, sell after snapshot and still be eligible to vote; Snapshot of tokens at certain block will be taken regularly
// For this we will use ERC20Votes and not just ERC20

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
  uint256 public s_maxSupply = 1000000000000000000000000;

  constructor() ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken") {
    // additional constructors from imported (libraries?).
    _mint(msg.sender, s_maxSupply);
  }

  // Functions below are overrides required by solidity. They update the snapshot after every token balance change. Source: https://github.com/PatrickAlphaC/dao-template/blob/main/contracts/GovernanceToken.sol

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes) {
    super._afterTokenTransfer(from, to, amount);
  }

  function _mint(address to, uint256 amount) internal override(ERC20Votes) {
    super._mint(to, amount);
  }

  function _burn(
    address account,
    uint256 amount
  ) internal override(ERC20Votes) {
    super._burn(account, amount);
  }
}
