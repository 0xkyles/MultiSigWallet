import { useEffect } from "react";
import useWalletStore, { Wallet } from "./stores/walletStore";
import useWeb3Store from "./stores/web3Store";
import WalletService from "./service/WalletService";
import { Contract } from "web3";

const WalletUpdater = () => {
  const { wallet, setWallet } = useWalletStore();
  const {
    web3Session: { web3, account, contract },
  } = useWeb3Store();

  // initial load
  useEffect(() => {
    if (web3) {
      const fetch = async () => {
        const wallet = await WalletService.getWallet(
          contract as Contract<any>,
          web3,
          account as string
        );

        setWallet(wallet);
      };

      fetch();
    }
  }, [web3]);

  // upon account change
  useEffect(() => {
    if (account) {
      const fetch = async () => {
        const approvalsByAccount = await WalletService.getTransactionsApprovals(
          contract as Contract<any>,
          account
        );

        setWallet({ ...wallet, approvalsByAccount });
      };

      fetch();
      return;
    }

    setWallet({} as Wallet);
  }, [account]);

  return null;
};

export default WalletUpdater;
