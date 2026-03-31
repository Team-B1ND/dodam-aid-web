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
  active: boolean;
  releases: Release[];
  githubReleaseUrl: string;
}

export type ReleaseStatus = "ALLOWED" | "PENDING" | "DENIED";

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
