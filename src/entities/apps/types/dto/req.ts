import type { App, ServerConfig } from "@/entities/apps/types";

export type CreateAppReq = Omit<
  App,
  "appId" | "active" | "releases" | "server"
> & {
  server?: Omit<
    ServerConfig,
    "prefixLevel" | "enabled" | "status" | "denyResult"
  >;
};

export type UpdateAppReq = Omit<App, "active" | "releases" | "server" | "githubReleaseUrl" | "teamId"> & {
  server?: Omit<
    ServerConfig,
    "prefixLevel" | "enabled" | "status" | "denyResult"
  >;
};
