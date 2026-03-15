import { useGetMembersQuery } from "@/entities/teams/queries";
import { useParams } from "react-router-dom";

export const useGetMembers = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetMembersQuery(id!);

  return data.data.data;
};
