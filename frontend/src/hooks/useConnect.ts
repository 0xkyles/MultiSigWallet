import { useState } from "react";
import Web3 from "web3";

const useConnect = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const connect = async () => {
    //@ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      setError("Can't find metamask");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await ethereum.enable();

      const web3 = new Web3(ethereum);
      const accounts = await web3.eth.getAccounts();

      console.log(accounts);
    } catch (error) {
      setError("Couldn't connect to metamask");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, connect };
};

export default useConnect;
