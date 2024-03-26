// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

contract MultiSignatureWallet {
  address[] public owners;
  mapping(address => bool) public isOwner;
  uint256 public immutable approvalsRequired;

  struct Transaction {
    address proposer;
    address to;
    uint256 value;
    bytes data;
    uint256 numOfApprovals;
    bool complete;
  }

  Transaction[] public transactions;
  uint256 public transactionsCount;
  mapping(uint => mapping(address => bool)) public approvals;

  event ProposeTransaction(uint256 indexed txID, address indexed proposer, address indexed to, uint256 value, bytes data);
  event Deposit(address indexed sender, uint256 value);
  event ApproveTransaction(uint256 indexed txID, address indexed owner);
  event RevokeApproval(uint256 indexed txID, address indexed owner);
  event CompleteTransaction(uint256 indexed txID, address indexed owner, bytes data);

  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }

  constructor(address[] memory _owners, uint256 _approvalsRequired) {
    require(_owners.length > 0, "No owners");
    require(_approvalsRequired > 0 && _approvalsRequired <= _owners.length, "number of approval invalid");

    for (uint i = 0; i < _owners.length; i++) {
        require(_owners[i] != address(0), "invalid address");
        require(!isOwner[_owners[i]], "owner exists");

        isOwner[_owners[i]] = true;
        owners.push(_owners[i]);
    }

    approvalsRequired = _approvalsRequired;
  }

  function getOwners() public view returns (address[] memory) {
    return owners;
  }

  function getTransactions() public view returns (Transaction[] memory) {
    return transactions;
  }

  modifier onlyOwner() {
    require(isOwner[msg.sender], "Not owner");
    _;
  }

  modifier validTx(uint256 txID) {
    require(txID < transactions.length, "Invalid transaction");
    _;
  }

  modifier unApprovedTx(uint256 txID) {
    require(!approvals[txID][msg.sender], "Already approved");
    _;
  }

  modifier unCompleteTx(uint256 txID) {
    require(!transactions[txID].complete, "Already completed");
    _;
  }

  modifier approvedTx(uint256 txID) {
    require(approvals[txID][msg.sender], "Not approved");
    _;
  }

  modifier canComplete(uint256 txID) {
    require(transactions[txID].numOfApprovals >= approvalsRequired, "Not enough approvals");
    _;
  }

  function proposeTransaction(address _to, uint256 _value, bytes memory _data) external onlyOwner {
    require(_value <= address(this).balance, "Balance insufficient");

    Transaction memory t = Transaction({
      proposer: msg.sender,
      to: _to,
      value: _value,
      data: _data,
      numOfApprovals: 1,
      complete: false
    });
    transactions.push(t);
    approvals[transactions.length - 1][msg.sender] = true;
    transactionsCount++;

    emit ProposeTransaction(transactions.length - 1, msg.sender, _to, _value, _data);
  }

  function approveTransaction(uint256 _txID) external onlyOwner validTx(_txID) unApprovedTx(_txID) unCompleteTx(_txID) {
    Transaction storage t = transactions[_txID];
    t.numOfApprovals++;
    approvals[_txID][msg.sender] = true;

    emit ApproveTransaction(_txID, msg.sender);
  }

  function revokeApproval(uint256 _txID) external onlyOwner validTx(_txID) approvedTx(_txID) unCompleteTx(_txID) {
    Transaction storage t = transactions[_txID];
    approvals[_txID][msg.sender] = false;
    t.numOfApprovals--;

    emit RevokeApproval(_txID, msg.sender);
  }

  function completeTransaction(uint256 _txID) external onlyOwner validTx(_txID) unCompleteTx(_txID) canComplete(_txID) {
    Transaction storage t = transactions[_txID];

    (bool success, bytes memory data) = t.to.call{value : t.value}(t.data);
    require(success, "tx failed");

    t.complete = true;
    emit CompleteTransaction(_txID, msg.sender, data);
  }
}
