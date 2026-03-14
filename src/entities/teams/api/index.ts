import type { CreateTeamReq } from "@/entities/teams/types/dto/req";
import type { CreateTeamRes } from "@/entities/teams/types/dto/res";
import { apiClient } from "@/shared/libs/api-client";
import type { BaseResponse } from "@/shared/types/base-response";

export const TeamApi = {
  async createTeam(data: CreateTeamReq) {
    return await apiClient.post<BaseResponse<CreateTeamRes>>(
      "/inapp/team",
      data,
    );
  },
};
