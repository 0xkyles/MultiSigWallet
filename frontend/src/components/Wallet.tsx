import useWeb3Store from "@/stores/web3Store";
import AccountBanner from "./AccountBanner";
import WalletInfo from "./WalletInfo";

const Wallet = () => {
  const { web3Session } = useWeb3Store();

  return (
    <div className="flex-1 flex flex-col gap-5">
      <AccountBanner web3Session={web3Session} />
      <WalletInfo />
    </div>
  );
};

export default Wallet;
