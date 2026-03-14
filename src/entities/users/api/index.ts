import type { User } from "@/entities/users/types";
import { apiClient } from "@/shared/libs/api-client";
import type { BaseResponse } from "@/shared/types/base-response";

export const UserApi = {
  async getMyInfo() {
    return await apiClient.post<BaseResponse<User>>("/user/me");
  },
};
