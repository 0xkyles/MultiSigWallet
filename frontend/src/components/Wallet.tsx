import Alert from "@/components/Alert";
import Web3Service from "@/service/Web3Service";
import useWeb3Store from "@/stores/web3Store";
import { useEffect, useState } from "react";

const Wallet = () => {
  const { web3Session } = useWeb3Store();
  const [network, setNetwork] = useState("");

  useEffect(() => {
    const fetch = async () => {
      //@ts-ignore
      const network = await Web3Service.getCurrentNetwork(web3Session.web3);
      setNetwork(network);
    };

    fetch();
  }, []);

  return (
    <div className="w-full border border-gray-700">
      <Alert
        variant="default"
        title={`Network ${network}`}
        description={`Connected as ${web3Session.account}`}
      />
    </div>
  );
};

export default Wallet;
