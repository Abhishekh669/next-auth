import { deleteTransaction } from "@/actions/user/transactions/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner';
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            toast.success("Transaction deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['allTransactions'] })
        },
        onError: () => { },
        onSettled: () => { },
        onMutate: () => { },
    })
}   