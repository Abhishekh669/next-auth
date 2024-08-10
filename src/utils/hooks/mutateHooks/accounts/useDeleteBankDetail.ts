import { deleteBankDetails } from "@/actions/user/accounts/bankData";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner';
export const useDeleteBankDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBankDetails ,
        onSuccess: () => {
            toast.success("Bank Details deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['getUserBankDetails'] })
        },
        onError: () => { },
        onSettled: () => { },
        onMutate: () => { },
    })
}   