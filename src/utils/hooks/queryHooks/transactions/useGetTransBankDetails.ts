import { getTransactions, transactionFromBankDetail } from "@/actions/user/transactions/transactions";
import { transBankDetail } from "@/types/bankdetail.types";
import { useQuery } from "@tanstack/react-query";

export  const fetchTransBankDetails = async (data : transBankDetail) =>{
    const response = await transactionFromBankDetail(data);
    console.log("this is the response in the fetchalltransaction",JSON.parse(response.data as string));
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetTransBankDetails= (data : transBankDetail) => {
    return useQuery({
        queryKey : ['transBankDetail'],
        queryFn : () => fetchTransBankDetails(data),
    })
}