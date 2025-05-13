// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SaccoPool {
    IERC20 public stablecoin; // USDC on Base
    mapping(address => uint256) public shares;
    uint256 public totalShares;

    constructor(address _stablecoin) {
        stablecoin = IERC20(_stablecoin);
    }

    function deposit(uint256 amount) external {
        stablecoin.transferFrom(msg.sender, address(this), amount);
        shares[msg.sender] += amount;
        totalShares += amount;
    }

    function withdraw(uint256 amount) external {
        require(shares[msg.sender] >= amount, "Insufficient shares");
        shares[msg.sender] -= amount;
        totalShares -= amount;
        stablecoin.transfer(msg.sender, amount);
    }
}