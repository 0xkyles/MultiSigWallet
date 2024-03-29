import useWalletStore from "@/stores/walletStore";
import AccountBanner from "./AccountBanner";
import WalletInfo from "./WalletInfo";
import TransactionsTable from "./TransactionsTable";
import useWeb3Store from "@/stores/web3Store";

const Wallet = () => {
  const { isWalletAvailable, wallet } = useWalletStore();
  const { web3Session } = useWeb3Store();

  return (
    <div className="flex-1 flex flex-col gap-5">
      <AccountBanner web3Session={web3Session} />
      {isWalletAvailable && (
        <div className="flex-1 flex gap-3">
          <div className="w-[25%] shadow-lg">
            <WalletInfo wallet={wallet} web3={web3Session.web3} />
          </div>
          <div className="flex-1">
            <TransactionsTable
              transactions={wallet.transactions}
              approvalsByAccount={wallet.approvalsByAccount}
              approvalsRequired={wallet.approvalsRequired}
              account={web3Session.account!}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
