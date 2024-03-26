import useWeb3Store from "@/stores/web3Store";
import { useState } from "react";
import Web3 from "web3";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";
import { address as contractAddress } from "@/build/contracts/contract.json";

const useConnect = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { update } = useWeb3Store();

  const connect = async () => {
    //@ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      setError("Can't find metamask");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await ethereum.enable();

      const web3 = new Web3(ethereum);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(contractABI.abi, contractAddress, {
        from: accounts[0],
      });

      update({ account: accounts[0], web3, contract });
    } catch (error) {
      setError("Couldn't connect to metamask");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, connect };
};

export default useConnect;
