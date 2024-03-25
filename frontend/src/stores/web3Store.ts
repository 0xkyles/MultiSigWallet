import Web3 from "web3";
import { create } from "zustand";

interface Web3Session {
  web3?: Web3;
  account?: string;
}

interface Web3Store {
  web3Session: Web3Session;
  update: (session: Web3Session) => void;
}

const useWeb3Store = create<Web3Store>((set) => ({
  web3Session: {} as Web3Session,
  update: (session) =>
    set((state) => ({ web3Session: { ...state.web3Session, ...session } })),
}));

export default useWeb3Store;
