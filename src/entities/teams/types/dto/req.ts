import type { Team } from "@/entities/teams/types";

export type CreateTeam = Omit<Team, "isOwner" | "teamId">;
