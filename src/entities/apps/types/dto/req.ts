import type { App, ServerConfig } from "@/entities/apps/types";

export type CreateApp = Omit<
  App,
  "appId" | "active" | "releases" | "server"
> & {
  server?: Omit<
    ServerConfig,
    "prefixLevel" | "enabled" | "status" | "denyResult"
  >;
};
