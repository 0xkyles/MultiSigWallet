// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract MutliSignatureWallet {
  mapping(address => bool) owners;
  uint256 numOfOwners; 
  uint256 immutable approvalsRequired;

  uint256 public numTransactions;
  mapping (uint => Transaction) public transactions;

  event ProposeTransaction(uint256 indexed txID, address indexed proposer, address indexed to, uint256 value, bytes data);
  event Deposit(address indexed sender, uint256 value);
  event ConfirmTransaction(uint256 indexed txID, address indexed owner);

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

  modifier validTx(uint256 txID) {
    require(txID < numTransactions, "Invalid transaction");
    _;
  }

  modifier unConfirmedTx(uint256 txID) {
    require(!transactions[txID].approvals[msg.sender], "Already confirmed");
    _;
  }

  modifier unCompleteTx(uint256 txID) {
    require(!transactions[txID].complete, "Already completed");
    _;
  }

  function proposeTransaction(address _to, uint256 _value, bytes memory _data) external onlyOwner {
    require(_value <= address(this).balance, "Balance insufficient");

    Transaction storage t = transactions[numTransactions++];
    t.proposer = msg.sender;
    t.to = _to;
    t.value = _value;
    t.data = _data;
    t.numOfApprovals = 1;
    t.approvals[msg.sender] = true;

    emit ProposeTransaction(numTransactions - 1, msg.sender, _to, _value, _data);
  }

  function confirmTransaction(uint256 _txID) external onlyOwner validTx(_txID) unConfirmedTx(_txID) unCompleteTx(_txID) {
    Transaction storage t = transactions[_txID];
    t.approvals[msg.sender] = true;
    t.numOfApprovals++;

    emit ConfirmTransaction(_txID, msg.sender);
  }
}
