import type { App, Release, ReleaseStatus } from "@/entities/apps/types";

export interface ModifyAppRes {
  appId: string;
}

export type AppListItemRes = Omit<App, "active" | "releases" | "server"> & {
  releaseEnabled: boolean;
  releaseStatus: ReleaseStatus;
};

export type ReleaseDetail = Release & {
  releaseNote?: string;
}