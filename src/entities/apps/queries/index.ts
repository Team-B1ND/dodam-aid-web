import { AppApi } from "@/entities/apps/api";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

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

export const useGetReleasesQuery = (
  appId: string,
  options: { keyword?: string; date?: string },
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["releases", appId, options.keyword, options.date],
    queryFn: ({ pageParam }) =>
      AppApi.getReleases(appId, { ...options, page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });
};
