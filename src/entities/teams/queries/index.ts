import { TeamApi } from "@/entities/teams/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetTeamsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["team", "me"],
    queryFn: TeamApi.getTeams,
  });
};

export const useGetTeamByIdQuery = (teamId: string) => {
  return useSuspenseQuery({
    queryKey: ["team", teamId],
    queryFn: () => TeamApi.getTeamById(teamId),
  });
};

export const useGetMembersQuery = (teamId: string) => {
  return useSuspenseQuery({
    queryKey: ["team", teamId, "member"],
    queryFn: () => TeamApi.getMembers(teamId),
  });
};
