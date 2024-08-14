import { createBankBalance } from "@/actions/user/accounts/bankData";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateBankBalance = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBankBalance,
        onSuccess : () =>{
            toast.success("Bank Balance added sucessfully")
            queryClient.invalidateQueries({queryKey : ['getBankBalanceData']})
            
        },
        onError : () =>{
            toast.error("Failed to upload bank balance")
        },
        onSettled : () =>{},
        onMutate : () => {},
    })
}