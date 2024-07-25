import { getTransactionData } from "@/actions/user/transactions/transactions";
import { useQuery } from "@tanstack/react-query";

const fetchTransactionData = async (transactionId : string) =>{
    const response = await getTransactionData(transactionId);
    console.log("this is the response in the useGetTrasactionData",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetTransactionData = (transactionId : string) =>{
    return useQuery({
        queryKey : ["uniqueTransaction", transactionId],
        queryFn : () =>  fetchTransactionData(transactionId),
    })
}