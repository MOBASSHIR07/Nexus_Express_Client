// src/Hooks/useRole.js
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./useAxiosInstance";
import useAuth from "./useAuth";

const useRole = () => {
    const axiosSecure = useAxiosInstance();
    const { user } = useAuth()

    const { data: roleData, isLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !!user?.email, // only fetch when logged in
        queryFn: async () => {
            const res = await axiosSecure.get(`/nexus/api/users/role?email=${user.email}`);
            return res.data;
        },
    });

    return { role: roleData?.role, isLoading };
};

export default useRole;
