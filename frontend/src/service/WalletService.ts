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
  getActiveAccount = (
    web3: Web3,
    callback: (error: any | null, result: string | null) => void
  ) => {
    const interval = setInterval(async () => {
      try {
        const accounts = await web3.eth.getAccounts();

        await callback(null, accounts[0]);
      } catch (error) {
        callback(error, null);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  getTransactionsApprovals = async (
    contract: Contract<any>,
    account: string
  ) => {
    const approvals: boolean[] = [];
    const transactionsCount = Number(
      await contract.methods.transactionsCount().call()
    );

    for (let i = 0; i < transactionsCount; i++) {
      approvals.push(await contract.methods.approvals(i, account).call());
    }

    return approvals;
  };

  getTransactions = async (contract: Contract<any>, account: string) => {
    const transactions: Transaction[] = [];
    const transactionsCount = await contract.methods
      .transactionsCount()
      .call<bigint>();
    const approvalsByAccount = await this.getTransactionsApprovals(
      contract,
      account
    );

    for (let i = 0; i < Number(transactionsCount); i++) {
      const t: GetTransactionResponse = await contract.methods
        .transactions(i)
        .call();

      transactions.push({
        proposer: t.proposer,
        to: t.to,
        value: Number(t.value),
        data: t.data,
        complete: t.complete,
        numOfApprovals: Number(t.numOfApprovals),
      });
    }

    return { transactions, transactionsCount, approvalsByAccount };
  };

  getWallet = async (contract: Contract<any>, web3: Web3, account: string) => {
    const contractAddress = contract.options.address!;
    const owners: string[] = await contract.methods.getOwners().call();
    const approvalsRequired = await contract.methods
      .approvalsRequired()
      .call<bigint>();
    const balance = await web3.eth.getBalance(contractAddress);
    const { transactionsCount, transactions, approvalsByAccount } =
      await this.getTransactions(contract, account);

    return {
      balance: Number(balance),
      owners,
      approvalsRequired: Number(approvalsRequired),
      contractAddress,
      transactionsCount: Number(transactionsCount),
      transactions,
      approvalsByAccount,
    };
  };
}

export default new WalletService();
