import useWeb3Store from "@/stores/web3Store";
import { useEffect } from "react";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";
import { address as contractAddress } from "@/build/contracts/contract.json";

const Test = () => {
  const {
    web3Session: { web3, account },
  } = useWeb3Store();

  useEffect(() => {
    const contract = new web3!.eth.Contract(contractABI.abi, contractAddress, {
      from: account,
    });

    const fetch = async () => {
      const result: BigInt = await contract.methods.approvalsRequired().call();
      const owners = await contract.methods.getOwners().call();
      const transactionsCount = await contract.methods
        .transactionsCount()
        .call();
      console.log(result.toString(), owners, transactionsCount);
    };

    fetch();
  });

  return null;
};

export default Test;
