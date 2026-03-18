import type { Team } from "@/entities/teams/types";

export type CreateTeamReq = Omit<Team, "isOwner" | "teamId">;

export type UpdateTeamReq = Omit<Team, "isOwner">;

export interface DeleteMemberReq {
  teamId: string;
  users: string[];
}

export interface UpdateOwnerReq {
  teamId: string;
  userPublicId: string;
}