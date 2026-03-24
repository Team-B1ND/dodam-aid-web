import { useGetMyInfoQuery } from "@/entities/users/queries";

export const useGetMyInfo = () => {
  const { data } = useGetMyInfoQuery();

  return data.data.data;
};
