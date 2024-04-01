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
  transactions: Transaction[];
  approvalsByAccount: boolean[];
}

interface WalletStore {
  wallet: Wallet;
  isWalletAvailable: boolean;
  setIsWalletAvailable: (value: boolean) => void;
  addToBalance: (value: number) => void;
  addTransaction: (transaction: Transaction, approvalByAccount: boolean) => void;
  setWallet: (wallet: Wallet) => void;
}

const useWalletStore = create<WalletStore>((set) => ({
  wallet: {} as Wallet,
  isWalletAvailable: false,
  addToBalance: (value: number) =>
    set((state) => ({
      wallet: { ...state.wallet, balance: state.wallet.balance + value },
    })),
  addTransaction: (transaction: Transaction, approvalByAccount: boolean) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        approvalsByAccount: [...state.wallet.approvalsByAccount, approvalByAccount],
        transactions: [...state.wallet.transactions, transaction],
      },
    })),
  setIsWalletAvailable: (value: boolean) => set({ isWalletAvailable: value }),
  setWallet: (wallet: Wallet) => set({ wallet }),
}));

export default useWalletStore;
