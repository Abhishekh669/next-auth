import { getAllUser } from "@/actions/userData/userData"
import { useQuery } from "@tanstack/react-query";

export  const fetchAllUsers = async() =>{
    const response = await getAllUser();
    return response;
}

export const useGetAllUsers = () =>{
    return useQuery({
        queryKey : ["allUsers"],
        queryFn : () => fetchAllUsers(),
    })
}