import Web3, { Contract } from "web3";
import { Transaction } from "@/stores/walletStore";

interface GetTransactionResponse {
  proposer: string;
  to: string;
  value: bigint;
  data: string;
  numOfApprovals: bigint;
  complete: boolean;
}

class WalletService {
  getTransactions = async (contract: Contract<any>, account: string) => {
    const transactions: Transaction[] = [];
    const transactionsCount = await contract.methods
      .transactionsCount()
      .call<bigint>();

    for (let i = 0; i < Number(transactionsCount); i++) {
      const t: GetTransactionResponse = await contract.methods
        .transactions(i)
        .call();
      const approvedByAccount: boolean = await contract.methods
        .approvals(i, account)
        .call();

      transactions.push({
        proposer: t.proposer,
        to: t.to,
        value: Number(t.value),
        data: t.data,
        complete: t.complete,
        numOfApprovals: Number(t.numOfApprovals),
        approvedByAccount,
      });
    }

    return { transactions, transactionsCount };
  };

  getWallet = async (contract: Contract<any>, web3: Web3, account: string) => {
    const contractAddress = contract.options.address!;
    const owners: string[] = await contract.methods.getOwners().call();
    const approvalsRequired = await contract.methods
      .approvalsRequired()
      .call<bigint>();
    const balance = await web3.eth.getBalance(contractAddress);
    const { transactionsCount, transactions } = await this.getTransactions(
      contract,
      account
    );

    return {
      balance: Number(balance),
      owners,
      approvalsRequired: Number(approvalsRequired),
      contractAddress,
      transactionsCount: Number(transactionsCount),
      transactions,
    };
  };
}

export default new WalletService();
