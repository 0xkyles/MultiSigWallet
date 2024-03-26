import { create } from "zustand";

export interface Transaction {
  proposer: string;
  to: string;
  value: number;
  data: string;
  numOfApprovals: number;
  complete: boolean;
  approvedByAccount: boolean;
}

interface Wallet {
  contractAddress: string;
  balance: number;
  owners: string[];
  approvalsRequired: number;
  transactionsCount: number;
  transactions: Transaction[];
}

interface WalletStore {
  wallet: Wallet;
  setWallet: (wallet: Wallet) => void;
}

const useWalletStore = create<WalletStore>((set) => ({
  wallet: {} as Wallet,
  setWallet: (wallet: Wallet) => set({ wallet }),
}));

export default useWalletStore;
