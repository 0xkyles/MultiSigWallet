import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import SelectEtherUnits from "./SelectEtherUnits";
import { useState } from "react";
import Alert from "./Alert";
import WalletService from "@/service/WalletService";
import useWeb3Store from "@/stores/web3Store";

const NewTransactionButton = () => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("ether");
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const {
    web3Session: { contract, web3 },
  } = useWeb3Store();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (to == "") {
      setError("To is unvalid");
      setLoading(false);
      return;
    }

    //@ts-ignore
    const txValue = web3?.utils.toWei(value, unit);
    try {
      const receipt = await WalletService.sendTransaction(
        contract!,
        to,
        Number(txValue),
        data == "" ? "0x00" : data
      );

      console.log(receipt);
    } catch (error) {
      setError("");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.currentTarget.value) < 0) {
      setValue("");
    } else {
      setValue(event.currentTarget.value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send transaction</DialogTitle>
          <DialogDescription className="text-xs">
            Keep data empty if you don't want to send any
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert
            className="mb-0"
            title=""
            description={error}
            variant="destructive"
          />
        )}
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="to" className="text-left">
                To
              </Label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.currentTarget.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="data" className="text-left">
                Data
              </Label>
              <Input
                id="data"
                value={data}
                onChange={(e) => setData(e.currentTarget.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="amount" className="text-left">
                Unit
              </Label>
              <SelectEtherUnits
                unit={unit}
                setUnit={setUnit}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="amount" className="text-left">
                Value
              </Label>
              <Input
                id="amount"
                type="number"
                value={value}
                onChange={onValueChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              type="submit"
              variant="default"
              className="text-sm"
            >
              {loading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Send transaction"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionButton;
