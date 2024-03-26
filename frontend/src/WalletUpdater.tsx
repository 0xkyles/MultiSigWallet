import { useEffect } from "react";
import useWalletStore, { Transaction } from "./stores/walletStore";
import useWeb3Store from "./stores/web3Store";
import { address as contractAddress } from "@/build/contracts/contract.json";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";

const WalletUpdater = () => {
  const { setWallet } = useWalletStore();
  const {
    web3Session: { web3, account },
  } = useWeb3Store();

  const FETCH_MAX_TRANSACTION = 1;

  useEffect(() => {
    if (account) {
      const contract = new web3!.eth.Contract(
        contractABI.abi,
        contractAddress,
        {
          from: account,
        }
      );

      const fetch = async () => {
        const owners: string[] = await contract.methods.getOwners().call();
        const transactionsCount = await contract.methods
          .transactionsCount()
          .call();
        const approvalsRequired = await contract.methods
          .approvalsRequired()
          .call();
        const balance = await web3?.eth.getBalance(contractAddress);

        let transactions: Transaction[] = [];
        const size = Math.min(FETCH_MAX_TRANSACTION, Number(transactionsCount));
        for (let i = 0; i < size; i++) {
          const t = await contract.methods.transactions(i).call();
          const approvedByAccount = await contract.methods
            .approvals(i, account)
            .call();

          console.log(t, approvedByAccount);
        }

        setWallet({
          contractAddress,
          balance: Number(balance),
          owners,
          approvalsRequired: Number(approvalsRequired),
          transactions,
          transactionsCount: Number(transactionsCount),
        });
      };

      fetch();
    }
  }, [account]);

  return null;
};

export default WalletUpdater;
