import Alert from "./Alert";
import { Web3Session } from "@/stores/web3Store";
import useNetwork from "@/hooks/useNetwork";

interface Props {
  web3Session: Web3Session;
}

const AccountBanner = ({ web3Session }: Props) => {
  const network = useNetwork();

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
    <div className="w-full shadow-lg">
      <Alert variant="default" title={title} description={description} />
    </div>
  );
};

export default AccountBanner;
