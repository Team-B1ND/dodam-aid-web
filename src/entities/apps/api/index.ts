import type { App } from "@/entities/apps/types";
import type { CreateAppReq } from "@/entities/apps/types/dto/req";
import type {
  AppListItemRes,
  CreateAppRes,
} from "@/entities/apps/types/dto/res";
import { apiClient } from "@/shared/libs/api-client";
import type { BaseResponse } from "@/shared/types/base-response";

export const AppApi = {
  async registerApp(data: CreateAppReq) {
    return await apiClient.post<BaseResponse<CreateAppRes>>("/inapp/app", data);
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
};
