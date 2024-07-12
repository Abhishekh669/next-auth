import { getUserData } from "@/actions/userData/userData";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async (userId : string) =>{
    const response = await getUserData(userId);
    console.log("this is the response in the useGetUserData",response)
    return response;
}

export const useGetUserData = (userId : string) =>{
    return useQuery({
        queryKey : ["accounts", userId],
        queryFn : () =>  fetchUserData(userId),
    })
}