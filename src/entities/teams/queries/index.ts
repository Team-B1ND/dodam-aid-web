import { TeamApi } from "@/entities/teams/api"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useGetTeamsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["team", "me"],
    queryFn: TeamApi.getTeams
  })
}