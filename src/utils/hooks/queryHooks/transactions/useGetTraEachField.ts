import { getTransactions, getTransEachField, transactionFromBankDetail } from "@/actions/user/transactions/transactions";
import { transBankDetail } from "@/types/bankdetail.types";
import { useQuery } from "@tanstack/react-query";

export  const fetchEachTransData = async (data : {userId : string, bankDetailsId : string }) =>{
    const response = await getTransEachField(data);
    console.log("this is the response in the fetchalltransaction",JSON.parse(response.data as string));
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGEtTranEachField= (data : {userId : string, bankDetailsId : string }) => {
    return useQuery({
        queryKey : ['getTransEAchGield', data],
        queryFn : () => fetchEachTransData(data),
    })
}