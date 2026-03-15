import type { CreateAppReq } from "@/entities/apps/types/dto/req";
import type { CreateAppRes } from "@/entities/apps/types/dto/res";
import { apiClient } from "@/shared/libs/api-client";
import type { BaseResponse } from "@/shared/types/base-response";

export const AppApi = {
  async registerApp(data: CreateAppReq) {
    return await apiClient.post<BaseResponse<CreateAppRes>>("/inapp/app", data);
  },
};
