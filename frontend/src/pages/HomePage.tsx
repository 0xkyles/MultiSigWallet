import Alert from "@/components/Alert";
import useWeb3Store from "@/stores/web3Store";
import ConnectWalletCard from "@/components/ConnectWalletCard";
import useWalletStore from "@/stores/walletStore";

export function HomePage() {
  const { web3Session } = useWeb3Store();
  const { wallet } = useWalletStore();

  return (
    <div className="min-h-screen flex justify-center items-center bg-grid">
      <div className="flex flex-col gap-3 items-center">
        {web3Session.account && (
          <>
            <Alert
              variant="default"
              title="Account"
              description={`Connected as ${web3Session.account}`}
            />
          </>
        )}
        {!web3Session.account && <ConnectWalletCard />}
      </div>
    </div>
  );
}

export default HomePage;
