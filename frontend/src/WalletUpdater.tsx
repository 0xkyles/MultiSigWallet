import { useEffect } from "react";
import useWalletStore, { Wallet } from "./stores/walletStore";
import useWeb3Store from "./stores/web3Store";
import WalletService from "./service/WalletService";
import { Contract } from "web3";

const WalletUpdater = () => {
  const { wallet, setWallet, setIsWalletAvailable, addToBalance, addTransaction } =
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
          account,
          wallet.transactions ? wallet.transactions.length : 0
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

  // subscribe to events
  useEffect(() => {
    if (account) {
      const subscription = WalletService.subscribe(contract!, async (_, event) => {
        if (event) {
          switch (event.event) {
            case "Deposit": {
              addToBalance(Number(event.returnValues.value));
              break;
            }
            case "ProposeTransaction": {
              //@ts-ignore
              const {transaction, approvalByAccount} = await WalletService.getTransaction(contract, account, event.returnValues.txID);
              addTransaction(transaction, approvalByAccount);
              break;
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
