import { useGetTeamByIdQuery } from "@/entities/teams/queries";
import { useParams } from "react-router-dom";

export const useGetTeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetTeamByIdQuery(id!);

  return data.data.data;
};
