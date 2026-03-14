import { UserApi } from "@/entities/users/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetMyInfoQuery = () => {
  return useSuspenseQuery({
    queryKey: ["user", "me"],
    queryFn: UserApi.getMyInfo,
    retry: false,
  });
};
