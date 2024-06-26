import useWeb3Store from "@/stores/web3Store";
import ConnectWalletCard from "@/components/ConnectWalletCard";
import Wallet from "@/components/Wallet";
import "./App.css";

export function App() {
  const {
    web3Session: { account },
  } = useWeb3Store();

  return (
    <div className="min-h-screen bg-grid py-10 px-14 flex">
      {account && <Wallet />}
      {!account && (
        <div className="flex-1 flex justify-center items-center">
          <ConnectWalletCard />
        </div>
      )}
    </div>
  );
}

export default App;
