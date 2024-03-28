import useWalletStore from "@/stores/walletStore";
import AccountBanner from "./AccountBanner";
import WalletInfo from "./WalletInfo";

const Wallet = () => {
  const { isWalletAvailable } = useWalletStore();

  return (
    <div className="flex-1 flex flex-col gap-5">
      <AccountBanner />
      {isWalletAvailable && <WalletInfo />}
    </div>
  );
};

export default Wallet;
