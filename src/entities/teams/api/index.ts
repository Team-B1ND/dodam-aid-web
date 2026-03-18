import type { Team } from "@/entities/teams/types";
import type {
  CreateTeamReq,
  DeleteMemberReq,
  UpdateTeamReq,
} from "@/entities/teams/types/dto/req";
import type { CreateTeamRes } from "@/entities/teams/types/dto/res";
import type { Member } from "@/entities/users/types";
import { apiClient } from "@/shared/libs/api-client";
import type { BaseResponse } from "@/shared/types/base-response";

export const TeamApi = {
  async createTeam(data: CreateTeamReq) {
    return await apiClient.post<BaseResponse<CreateTeamRes>>(
      "/inapp/team",
      data,
    );
  },

  async getTeams() {
    return await apiClient.get<BaseResponse<Team[]>>("/inapp/team/me");
  },

  async getTeamById(teamId: string) {
    return await apiClient.get<BaseResponse<Team>>(`/inapp/team/${teamId}`);
  },

  async getMembers(teamId: string) {
    return await apiClient.get<BaseResponse<Member[]>>(
      `/inapp/team/${teamId}/member`,
    );
  },

  async updateTeam(data: UpdateTeamReq) {
    return await apiClient.patch(`/inapp/team`, data);
  },

  async deleteMember(data: DeleteMemberReq) {
    let param = "";
    data.users.forEach((u) => (param += `users=${u}`));
    return await apiClient.delete(`/inapp/team/${data.teamId}/member?${param}`);
  },
};
