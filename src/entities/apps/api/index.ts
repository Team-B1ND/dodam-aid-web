import type { App, Release } from "@/entities/apps/types";
import type {
  CreateAppReq,
  CreateReleaseReq,
  UpdateAppReq,
} from "@/entities/apps/types/dto/req";
import type {
  AppListItemRes,
  ModifyAppRes,
} from "@/entities/apps/types/dto/res";
import { apiClient } from "@/shared/libs/api-client";
import type { BaseResponse } from "@/shared/types/base-response";
import type { PageResponse } from "@/shared/types/page-response";

export const AppApi = {
  async registerApp(data: CreateAppReq) {
    return await apiClient.post<BaseResponse<ModifyAppRes>>("/inapp/app", data);
  },

  async updateApp(data: UpdateAppReq) {
    return await apiClient.patch<BaseResponse<ModifyAppRes>>(
      "/inapp/app",
      data,
    );
  },

  async getApps() {
    return await apiClient.get<BaseResponse<AppListItemRes[]>>("/inapp/app/me");
  },

  async getAppsByTeam(teamId: string) {
    return await apiClient.get<BaseResponse<AppListItemRes[]>>(
      `/inapp/app/team/${teamId}`,
    );
  },

  async getAppById(appId: string) {
    return await apiClient.get<BaseResponse<App>>(`/inapp/app/${appId}`);
  },

  async getReleases(
    appId: string,
    options: { keyword?: string; date?: string; page: number },
  ) {
    return await apiClient.get<BaseResponse<PageResponse<Release>>>(
      `/inapp/app/${appId}/release?size=10&page=${options.page}${options.keyword ? `&keyword=${options.keyword}` : ""}${options.date ? `&date=${options.date}` : ""}`,
    );
  },

  async registerRelease(data: CreateReleaseReq) {
    return await apiClient.post("/inapp/app/release", data);
  },
};
