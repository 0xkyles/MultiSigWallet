import useWeb3Store from "@/stores/web3Store";
import { useEffect } from "react";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";
import { address as contractAddress } from "@/build/contracts/contract.json";

const Test = () => {
  const {
    web3Session: { web3, account },
  } = useWeb3Store();

  if (!account) return null;

  useEffect(() => {
    const contract = new web3!.eth.Contract(contractABI.abi, contractAddress, {
      from: account,
    });

    const fetch = async () => {
      const owners = await contract.methods.getOwners().call();
      const transactionsCount = await contract.methods
        .transactionsCount()
        .call();
      const approvalsRequired = await contract.methods
        .approvalsRequired()
        .call();
      const balance = await web3?.eth.getBalance(contractAddress);

      let transactions = [];
      const size = Math.min(5, Number(transactionsCount));
      for (let i = 0; i < size; i++) {
        transactions.push(await contract.methods.transactions(i).call());
      }

      console.log(
        `Balance ${balance} 
        - Approvals required ${Number(approvalsRequired)} 
        - owners ${owners} 
        - transactionsCount ${Number(transactionsCount)}`
      );
    };

    fetch();
  }, []);

  return null;
};

export default Test;
