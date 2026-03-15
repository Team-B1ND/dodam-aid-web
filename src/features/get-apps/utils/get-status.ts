import type { ReleaseStatus } from "@/entities/apps/types";
import { colors } from "@b1nd/dodam-design-system";

export const getStatus = (
  releaseEnabled: boolean,
  releaseStatus: ReleaseStatus,
) => {
  if (releaseEnabled && releaseStatus === "ALLOWED")
    return {
      color: colors.status.success,
      text: "서비스 중",
    };

  if (!releaseEnabled && releaseStatus === "ALLOWED")
    return {
      color: colors.status.error,
      text: "서비스 중지됨",
    };

  if (releaseStatus === "PENDING")
    return {
      color: colors.status.info,
      text: "서비스 검토 중",
    };

  if (releaseStatus === "DENIED")
    return {
      color: colors.status.error,
      text: "서비스 거부됨",
    };
};
