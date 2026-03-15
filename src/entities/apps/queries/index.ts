import { AppApi } from "@/entities/apps/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetAppsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["app", "me"],
    queryFn: AppApi.getApps,
  });
};

export const useGetAppsByTeamQuery = (teamId: string) => {
  return useSuspenseQuery({
    queryKey: ["app", "team", teamId],
    queryFn: () => AppApi.getAppsByTeam(teamId),
  });
};

export const useGetAppDetailQuery = (appId: string) => {
  return useSuspenseQuery({
    queryKey: ["app", appId],
    queryFn: () => AppApi.getAppById(appId),
  });
};
