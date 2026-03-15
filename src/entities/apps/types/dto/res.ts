import type { App, ReleaseStatus } from "@/entities/apps/types";

export interface CreateAppRes {
  appId: string;
}

export type AppListItemRes = Omit<App, "active" | "releases" | "server"> & {
  releaseEnabled: boolean;
  releaseStatus: ReleaseStatus;
};
