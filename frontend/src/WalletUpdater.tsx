import { useEffect } from "react";
import useWalletStore, { Wallet } from "./stores/walletStore";
import useWeb3Store from "./stores/web3Store";
import WalletService from "./service/WalletService";
import { Contract } from "web3";

const WalletUpdater = () => {
  const { wallet, setWallet, setIsWalletAvailable, addToBalance } =
    useWalletStore();
  const {
    web3Session: { web3, account, contract },
  } = useWeb3Store();

  // initial load
  // the first time web3 is available so is contract and account.
  useEffect(() => {
    if (web3) {
      const fetch = async () => {
        const result = await WalletService.getWallet(
          contract as Contract<any>,
          web3,
          account as string
        );

        setWallet({ ...wallet, ...result });
        setIsWalletAvailable(true);
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

    // when user disconnects
    setWallet({} as Wallet);
    setIsWalletAvailable(false);
  }, [account]);

  // subscribe to event here
  useEffect(() => {
    if (account) {
      const subscription = WalletService.subscribe(contract!, (_, event) => {
        if (event) {
          switch (event.event) {
            case "Deposit": {
              addToBalance(Number(event.returnValues.value));
            }
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [account]);

  return null;
};

export default WalletUpdater;
