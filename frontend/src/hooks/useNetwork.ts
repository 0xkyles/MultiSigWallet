import { useEffect, useState } from "react";

const useNetwork = () => {
  const [network, setNetwork] = useState("");

  useEffect(() => {
    const fetch = async () => {
      //@ts-ignore
      const network = await Web3Service.getCurrentNetwork(web3Session.web3);
      setNetwork(network);
    };

    fetch();
  }, []);

  return network;
};

export default useNetwork;
