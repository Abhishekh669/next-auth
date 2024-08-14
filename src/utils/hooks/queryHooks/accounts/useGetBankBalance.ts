import { getBankBalance } from "@/actions/user/accounts/bankData";
import { useQuery } from "@tanstack/react-query";
interface currentType{
    userId : string,
    bankDetailsId : string
}

const fetchUserBankBalance = async (data : currentType ) =>{
    const response = await getBankBalance(data);
    console.log("this is the response in the get bank  balance ",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}
export const useGetBankBalance = (data : currentType) =>{
    return useQuery({
        queryKey : ["getBankBalanceData", data],
        queryFn : () => fetchUserBankBalance(data)
    })
}