import type { User } from "@/entities/users/types";

export interface App {
  appId: string;
  teamId: string;
  name: string;
  subtitle: string;
  description: string;
  iconUrl: string;
  darkIconUrl?: string;
  inquiryMail: string;
  server?: ServerConfig;
  active: boolean;
  releases: Release[];
  githubReleaseUrl: string;
}

export type ReleaseStatus = "ALLOWED" | "PENDING" | "DENIED";

export interface ServerConfig {
  name: string;
  serverAddress: string;
  redirectPath: string;
  prefixLevel: number;
  omitApiPrefix: boolean;
  enabled: boolean;
  status: string;
  denyResult: string;
  usePushNotification: boolean;
}

export interface Release {
  releaseId: string;
  releaseUrl: string;
  memo: string;
  denyResult: string;
  status: ReleaseStatus;
  enabled: boolean;
  updatedUser?: User;
  createdAt: string;
  modifiedAt: string;
}
