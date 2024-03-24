// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract MutliSignatureWallet {
  mapping(address => bool) public owners;
  uint256 public numOfOwners; 
  uint256 public immutable approvalsRequired;

  event Deposit(address indexed sender, uint256 value);

  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }

  constructor(address[] memory _owners, uint256 _approvalsRequired) {
    require(_owners.length > 0, "No owners");
    require(_approvalsRequired > 0 && _approvalsRequired <= _owners.length);

    for (uint i = 0; i < _owners.length; i++) {
        require(_owners[i] != address(0), "invalid address");
        require(!owners[_owners[i]], "owner exists");

        owners[_owners[i]] = true;
    }

    approvalsRequired = _approvalsRequired;
    numOfOwners = _owners.length;
  }
}
