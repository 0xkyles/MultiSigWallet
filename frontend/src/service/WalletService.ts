import Web3, { Contract, EventLog } from "web3";
import { Transaction } from "@/stores/walletStore";
import web3Service, { Web3Service } from "./Web3Service";
import contractAddress from "@/build/contracts/contract.json";

interface GetTransactionResponse {
  proposer: string;
  to: string;
  value: bigint;
  data: string;
  numOfApprovals: bigint;
  complete: boolean;
}

class WalletService {
  web3Service: Web3Service;

  constructor(service: Web3Service) {
    this.web3Service = service;
  }

  subscribe = (
    contract: Contract<any>,
    callback: (error: Error | null, event: EventLog | null) => void
  ) => {
    const subscription = contract.events.allEvents({});

    subscription.on("data", (event: EventLog) => {
      callback(null, event);
    });

    subscription.on("error", (error: Error) => {
      callback(error, null);
    });

    return subscription;
  };

  depositToContract = async (web3: Web3, account: string, value: string) => {
    return await this.web3Service.deposit(
      web3,
      account,
      contractAddress.address,
      value
    );
  };

  getTransactionsApprovals = async (
    contract: Contract<any>,
    account: string,
    txCount: number
  ) => {
    const approvals: boolean[] = [];

    for (let i = 0; i < txCount; i++) {
      approvals.push(await contract.methods.approvals(i, account).call());
    }

    return approvals;
  };

  getTransaction = async (
    contract: Contract<any>,
    account: string,
    txID: number
  ) => {
    const t: GetTransactionResponse = await contract.methods
      .transactions(txID)
      .call();

    const approvalByAccount: boolean = await contract.methods.approvals(txID, account).call<boolean>();

    const transaction: Transaction = {
      proposer: t.proposer,
      to: t.to,
      value: Number(t.value),
      data: t.data,
      complete: t.complete,
      numOfApprovals: Number(t.numOfApprovals),
    };

    return { transaction, approvalByAccount };
  };

  getTransactions = async (contract: Contract<any>, account: string) => {
    const txs: GetTransactionResponse[] = await contract.methods.getTransactions().call();
    const approvalsByAccount = await this.getTransactionsApprovals(
      contract,
      account,
      txs.length
    );

    const transactions: Transaction[] = [];
    for (let i = 0; i < transactions.length; i++) {
      const t = txs[i];

      transactions.push({
        proposer: t.proposer,
        to: t.to,
        value: Number(t.value),
        data: t.data,
        complete: t.complete,
        numOfApprovals: Number(t.numOfApprovals),
      });
    }

    return { transactions, approvalsByAccount };
  };

  getWallet = async (contract: Contract<any>, web3: Web3, account: string) => {
    const contractAddress = contract.options.address!;
    const owners: string[] = await contract.methods.getOwners().call();
    const approvalsRequired = await contract.methods
      .approvalsRequired()
      .call<bigint>();
    const balance = await web3.eth.getBalance(contractAddress);
    const { transactions, approvalsByAccount } =
      await this.getTransactions(contract, account);

    return {
      balance: Number(balance),
      owners,
      approvalsRequired: Number(approvalsRequired),
      contractAddress,
      transactions,
      approvalsByAccount,
    };
  };

  sendTransaction = async (
    contract: Contract<any>,
    to: string,
    value: number,
    data: string,
    onSent: (transactionHash: string) => void
  ) => {
    return contract.methods
      .proposeTransaction(to, value, data)
      .send()
      .on("transactionHash", onSent);
  };
}

export default new WalletService(web3Service);
