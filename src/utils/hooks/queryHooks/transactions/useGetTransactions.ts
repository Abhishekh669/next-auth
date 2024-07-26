import { getTransactions } from "@/actions/user/transactions/transactions";
import { useQuery } from "@tanstack/react-query";

export  const fetchAllTransactions = async () =>{
    const response = await getTransactions();
    console.log("this is the response in the fetchalltransaction",JSON.parse(response.data as string));
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetTransactions= () => {
    return useQuery({
        queryKey : ['allTransactions'],
        queryFn :  fetchAllTransactions,
    })
}