import type { App } from "@/entities/apps/types";

export type CreateAppReq = Omit<
  App,
  "appId" | "active" | "releases" | "server"
>;

export type UpdateAppReq = Omit<
  App,
  "active" | "releases" | "server" | "githubReleaseUrl" | "teamId"
>;

export interface CreateReleaseReq {
  appId: string;
  releaseUrl: string;
  memo: string;
}

export interface ToggleReleaseReq {
  releaseId: string;
  enabled: boolean;
}
