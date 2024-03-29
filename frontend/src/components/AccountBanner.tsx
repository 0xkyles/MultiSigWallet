import Alert from "./Alert";
import { Web3Session } from "@/stores/web3Store";
import useNetwork from "@/hooks/useNetwork";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import DepositButton from "./DepositButton";

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
    <div className="w-full flex justify-between gap-5">
      <Alert
        variant="default"
        className="shadow-lg"
        title={title}
        description={description}
      />
      <div className="flex flex-col gap-2 justify-between">
        <DepositButton />
        <Button variant="success">
          <PlusIcon className="w-4 h-4 mr-2" /> new transaction
        </Button>
      </div>
    </div>
  );
};

export default AccountBanner;
