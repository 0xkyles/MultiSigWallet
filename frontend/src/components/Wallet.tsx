import useWalletStore from "@/stores/walletStore";
import AccountBanner from "./AccountBanner";
import WalletInfo from "./WalletInfo";
import TransactionsTable from "./TransactionsTable";

const Wallet = () => {
  const { isWalletAvailable } = useWalletStore();

  return (
    <div className="flex-1 flex flex-col gap-5">
      <AccountBanner />
      {isWalletAvailable && (
        <div className="flex-1 flex gap-3">
          <div className="w-[25%] shadow-lg">
            <WalletInfo />
          </div>
          <div className="flex-1">
            <TransactionsTable />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
