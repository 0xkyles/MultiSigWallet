import { create } from "zustand";

export interface Transaction {
  proposer: string;
  to: string;
  value: number;
  data: string;
  numOfApprovals: number;
  complete: boolean;
}

export interface Wallet {
  contractAddress: string;
  balance: number;
  owners: string[];
  approvalsRequired: number;
  transactionsCount: number;
  transactions: Transaction[];
  approvalsByAccount: boolean[];
}

interface WalletStore {
  wallet: Wallet;
  isWalletAvailable: boolean;
  setIsWalletAvailable: (value: boolean) => void;
  setBalance: (value: number) => void;
  setWallet: (wallet: Wallet) => void;
}

const useWalletStore = create<WalletStore>((set) => ({
  wallet: {} as Wallet,
  isWalletAvailable: false,
  setBalance: (value: number) =>
    set((state) => ({ wallet: { ...state.wallet, balance: value } })),
  setIsWalletAvailable: (value: boolean) => set({ isWalletAvailable: value }),
  setWallet: (wallet: Wallet) => set({ wallet }),
}));

export default useWalletStore;
