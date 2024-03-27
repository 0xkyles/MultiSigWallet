import Web3, { Contract } from "web3";
import { create } from "zustand";

export interface Web3Session {
  web3?: Web3;
  account?: string;
  contract?: Contract<any>;
  balance?: number;
}

interface Web3Store {
  web3Session: Web3Session;
  update: (session: Web3Session) => void;
}

const useWeb3Store = create<Web3Store>((set) => ({
  web3Session: {} as Web3Session,
  update: (session: Web3Session) => set({ web3Session: session }),
}));

export default useWeb3Store;
