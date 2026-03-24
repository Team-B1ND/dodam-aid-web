import { useGetTeamsQuery } from "@/entities/teams/queries";

export const useGetTeams = () => {
  const { data } = useGetTeamsQuery();

  return data.data.data;
};
