import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import SelectEtherUnits from "./SelectEtherUnits";
import { useState } from "react";
import Alert from "./Alert";
import useDeposit from "@/hooks/useDeposit";

const DepositButton = () => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("ether");
  const [amount, setAmount] = useState("");
  const { loading, success, onDeposit, error } = useDeposit(
    () => {
      setAmount("");
    },
    () => {
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onDeposit(amount, unit);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.currentTarget.value) < 0) {
      setAmount("");
    } else {
      setAmount(event.currentTarget.value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="default">
          <ArrowDownIcon className="w-4 h-4 mr-2" />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit ethereum</DialogTitle>
        </DialogHeader>
        {error && (
          <Alert
            className="mb-0"
            title=""
            description={error}
            variant="destructive"
          />
        )}
        {success && (
          <Alert
            className="mb-0"
            title=""
            description={success}
            variant="success"
          />
        )}
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
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
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={onAmountChange}
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
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Deposit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DepositButton;
