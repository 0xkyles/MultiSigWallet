import { useToast } from "@/components/ui/use-toast";
import WalletService from "@/service/WalletService";
import useWeb3Store from "@/stores/web3Store";
import { useState } from "react";

const useDeposit = () => {
  const {
    web3Session: { web3, account },
  } = useWeb3Store();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const onDeposit = async (
    amount: string,
    unit: string,
    cleanup: () => void,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    setLoading(true);
    setError("");

    if (Number(amount) <= 0) {
      setError("Can't deposit an invalid amount");
      setLoading(false);
      return;
    }

    //@ts-ignore
    const depositAmount = web3.utils.toWei(amount, unit);

    try {
      const receipt = await WalletService.depositToContract(
        web3!,
        account!,
        depositAmount
      );

      toast({
        description: `Succesfully deposited ${amount} ${unit}`,
        variant: "success",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      setError("Error while depositing eth.");
    } finally {
      setLoading(false);
      cleanup();
    }
  };

  return { onDeposit, error, loading };
};

export default useDeposit;
