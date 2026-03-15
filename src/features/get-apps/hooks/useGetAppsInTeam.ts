import { useGetAppsByTeamQuery } from "@/entities/apps/queries";
import { useParams } from "react-router-dom";

export const useGetAppsInTeam = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetAppsByTeamQuery(id!);

  return data.data.data;
};
