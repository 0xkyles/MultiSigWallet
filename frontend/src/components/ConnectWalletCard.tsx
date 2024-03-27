import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import MetamaskSVG from "@/assets/metamask.svg";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import useConnect from "@/hooks/useConnect";
import Alert from "./Alert";

const ConnectWalletCard = () => {
  const { error, loading, connect } = useConnect();

  return (
    <div className="flex flex-col gap-3 items-center">
      {error && (
        <Alert variant="destructive" title="Error" description={error} />
      )}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connect your wallet</CardTitle>
          <CardDescription>
            Access your multi signature wallet now.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={connect} disabled={loading} className="w-full">
            {loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <React.Fragment>
                <img className="w-5 h-5 mr-2" src={MetamaskSVG} alt="" />
                Connect metamask
              </React.Fragment>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectWalletCard;
