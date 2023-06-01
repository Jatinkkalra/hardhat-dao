// Objective:
// The owner of the Box contract, as we want to wait for a new vote to be "executed".

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
  constructor(
    uint256 minDelay, // minDelay: How long you have to wait before executing
    address[] memory proposers, // proposers: List of addresses that can propose
    address[] memory executors, // executors: Who can execute when a proposal passes
    address admin
  ) TimelockController(minDelay, proposers, executors, admin) {}
}
