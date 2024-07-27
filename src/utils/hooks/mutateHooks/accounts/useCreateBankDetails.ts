import { createBank } from "@/actions/user/accounts/bankData";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateBankDetails = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBank,
        onSuccess : () =>{
            toast.success("Bank Details created sucessfully")
            queryClient.invalidateQueries({queryKey : ['bankDetail']})
            
        },
        onError : () =>{
            toast.error("Failed to create bank account")
        },
        onSettled : () =>{},
        onMutate : () => {},
    })
}