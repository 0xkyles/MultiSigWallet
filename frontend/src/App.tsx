import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import MetamaskSVG from "./assets/metamask.svg";
import "./App.css";

export function App() {
  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-grid">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connect your wallet</CardTitle>
          <CardDescription>Access your multi signature wallet now.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <img className="w-5 h-5 mr-2" src={MetamaskSVG} alt="" />
            Connect metamask
          </Button>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

export default App;