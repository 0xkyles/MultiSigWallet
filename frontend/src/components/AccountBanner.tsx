import { useEffect, useState } from "react";
import Alert from "./Alert";
import { Web3Session } from "@/stores/web3Store";
import Web3Service from "@/service/Web3Service";

interface Props {
  web3Session: Web3Session;
}

const AccountBanner = ({ web3Session }: Props) => {
  const [network, setNetwork] = useState("");

  useEffect(() => {
    const fetch = async () => {
      //@ts-ignore
      const network = await Web3Service.getCurrentNetwork(web3Session.web3);
      setNetwork(network);
    };

    fetch();
  }, []);

  const description = (
    <div className="flex justify-between">
      <p>Connected as {web3Session.account}</p>
      <p>{web3Session.balance} $ETH</p>
    </div>
  );

  const title = (
    <div className="flex justify-between">
      <p>Network - {network}</p>
      <p className="text-lg">Balance</p>
    </div>
  );

  return (
    <div className="w-full border border-gray-700">
      <Alert variant="default" title={title} description={description} />
    </div>
  );
};

export default AccountBanner;
