import Web3Service from "@/service/Web3Service";
import useWeb3Store from "@/stores/web3Store";
import { useEffect, useState } from "react";

const useNetwork = () => {
  const [network, setNetwork] = useState("");
  const {
    web3Session: { web3 },
  } = useWeb3Store();

  useEffect(() => {
    const fetch = async () => {
      //@ts-ignore
      const network = await Web3Service.getCurrentNetwork(web3);
      setNetwork(network);
    };

    fetch();
  }, []);

  return network;
};

export default useNetwork;
