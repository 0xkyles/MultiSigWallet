// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract MutliSignatureWallet {
  mapping(address => bool) public owners;
  uint256 public numOfOwners; 
  uint256 public immutable approvalsRequired;

  event ProposeTransaction(uint256 indexed txId, address indexed proposer, address indexed to, uint256 value, bytes data);
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

  struct Transaction {
    address proposer;
    address to;
    uint256 value;
    bytes data;
    mapping(address => bool) approvals;
    uint256 numOfApprovals;
    bool complete;
  }

  modifier onlyOwner() {
    require(owners[msg.sender], "Not owner");
    _;
  }

  uint256 public numTransactions;
  mapping (uint => Transaction) public transactions;

  function proposeTransaction(address _to, uint256 _value, bytes memory _data) public onlyOwner {
    require(_value <= address(this).balance, "balance insufficient");

    Transaction storage t = transactions[numTransactions++];
    t.proposer = msg.sender;
    t.to = _to;
    t.value = _value;
    t.data = _data;
    t.numOfApprovals = 1;
    t.approvals[msg.sender] = true;

    emit ProposeTransaction(numTransactions - 1, msg.sender, _to, _value, _data);
  }
}
