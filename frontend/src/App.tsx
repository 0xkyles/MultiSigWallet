import useWeb3Store from "@/stores/web3Store";
import ConnectWalletCard from "@/components/ConnectWalletCard";
import Wallet from "@/components/Wallet";
import "./App.css";

export function App() {
  const { web3Session } = useWeb3Store();

  return (
    <div className="min-h-screen bg-grid py-10 px-14 flex">
      {web3Session.account && <Wallet />}
      {!web3Session.account && (
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col gap-3 items-center">
            <ConnectWalletCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
